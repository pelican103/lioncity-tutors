import fitz  # The PyMuPDF library
import os
from PIL import Image
import io
import glob
import json
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import zipfile
import tempfile

def process_zip_file_and_repackage(zip_path, banner_img, service, target_folder_id, opacity=0.6, cover_page_number=True, cover_page_pdf=None):
    """
    Extracts a ZIP, processes all PDFs inside, re-packages them into a new ZIP,
    and uploads it to Google Drive.
    """
    zip_filename = os.path.basename(zip_path)
    print(f"\n📦 Found ZIP file: {zip_filename}. Starting processing...")

    # Create two temporary directories
    # 1. To extract the original ZIP
    # 2. To store the processed PDFs
    with tempfile.TemporaryDirectory() as extract_dir, tempfile.TemporaryDirectory() as processed_dir:
        
        # --- Step 1: Extract the original ZIP ---
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
            print(f"  📂 Extracted contents to a temporary location.")
        except zipfile.BadZipFile:
            print(f"  ❌ Error: '{zip_filename}' is not a valid ZIP file.")
            return None, None # Return None for file_id and url
        
        # --- Step 2: Find and process PDFs inside ---
        pdf_files = glob.glob(os.path.join(extract_dir, "**/*.pdf"), recursive=True)
        if not pdf_files:
            print(f"  ❌ No PDF files found inside '{zip_filename}'.")
            return None, None

        print(f"  📄 Found {len(pdf_files)} PDF(s) inside the ZIP. Processing each...")
        for pdf_file in pdf_files:
            original_pdf_name = os.path.basename(pdf_file)
            processed_pdf_path = os.path.join(processed_dir, original_pdf_name)
            
            # Use your existing banner function
            success = add_banner_with_pymupdf_v1(
                input_pdf=pdf_file,
                output_pdf=processed_pdf_path,
                banner_img=banner_img,
                opacity=opacity,
                cover_page_number=cover_page_number,
                cover_page_pdf=cover_page_pdf
            )
            if not success:
                print(f"  ❌ Failed to process '{original_pdf_name}' within the ZIP.")

        # --- Step 3: Re-package into a new ZIP ---
        new_zip_name = f"processed_{zip_filename}"
        new_zip_path = os.path.join(tempfile.gettempdir(), new_zip_name)
        
        print(f"  🎁 Re-packaging processed PDFs into '{new_zip_name}'...")
        with zipfile.ZipFile(new_zip_path, 'w') as new_zip:
            for item in os.listdir(processed_dir):
                new_zip.write(os.path.join(processed_dir, item), arcname=item)
        
        # --- Step 4: Upload the new ZIP ---
        print(f"  📤 Uploading '{new_zip_name}' to Google Drive...")
        file_id = upload_to_google_drive(service, new_zip_path, target_folder_id)
        
        # --- Step 5: Clean up the new ZIP file ---
        os.remove(new_zip_path)

        if file_id:
            download_url = generate_download_url(file_id)
            print(f"  ✅ Successfully processed and uploaded ZIP: {new_zip_name}")
            return file_id, download_url
        else:
            print(f"  ❌ Failed to upload the processed ZIP.")
            return None, None
        
        
def add_banner_with_pymupdf_v1(input_pdf, output_pdf, banner_img, opacity=0.6, cover_page_number=True, cover_page_pdf=None):
    """
    Solution 1: Pre-process the banner image to add transparency using PIL
    
    Args:
        input_pdf (str): Path to the source PDF file.
        output_pdf (str): Path to save the new PDF file.
        banner_img (str): Path to the banner image file.
        opacity (float): Opacity level (0.0 = fully transparent, 1.0 = fully opaque)
        cover_page_number (bool): Whether to cover the page number in top-right corner
        cover_page_pdf (str): Path to cover page PDF to add to front (optional)
    """
    if not os.path.exists(banner_img):
        print(f"❌ Error: Banner image not found at '{banner_img}'")
        return False

    # Check if cover page exists if provided
    if cover_page_pdf and not os.path.exists(cover_page_pdf):
        print(f"❌ Error: Cover page PDF not found at '{cover_page_pdf}'")
        return False

    try:
        # Open and modify the banner image with PIL to add transparency
        pil_img = Image.open(banner_img)
        
        # Convert to RGBA if not already
        if pil_img.mode != 'RGBA':
            pil_img = pil_img.convert('RGBA')
        
        # Create a new image with the same size but with adjusted alpha
        transparent_img = Image.new('RGBA', pil_img.size, (255, 255, 255, 0))
        
        # Apply the opacity to the original image
        for x in range(pil_img.width):
            for y in range(pil_img.height):
                r, g, b, a = pil_img.getpixel((x, y))
                # Apply opacity to the alpha channel
                new_alpha = int(a * opacity)
                transparent_img.putpixel((x, y), (r, g, b, new_alpha))
        
        # Convert PIL image to bytes for PyMuPDF
        img_buffer = io.BytesIO()
        transparent_img.save(img_buffer, format='PNG')
        img_bytes = img_buffer.getvalue()
        
        doc = fitz.open(input_pdf)
        
        for page in doc:
            page_width = page.rect.width
            page_height = page.rect.height
            
            # FIRST: Cover the page number in top-right corner with white rectangle
            if cover_page_number:
                # Define the area to cover (top-right corner)
                # Adjust these dimensions based on your page number size/position
                cover_width = 80   # Width of the white rectangle
                cover_height = 25  # Height of the white rectangle
                margin_from_right = 5   # Distance from right edge
                margin_from_top = 5     # Distance from top edge
                
                page_number_rect = fitz.Rect(
                    page_width - cover_width - margin_from_right,  # x0: left edge of rectangle
                    margin_from_top,                               # y0: top edge
                    page_width - margin_from_right,                # x1: right edge
                    margin_from_top + cover_height                 # y1: bottom edge
                )
                
                # Draw white rectangle to cover the page number
                page.draw_rect(page_number_rect, color=None, fill=(1, 1, 1), overlay=True)
            
            # SECOND: Add the transparent banner
            # Get original image dimensions
            img_width, img_height = transparent_img.size
            
            # Calculate banner dimensions maintaining aspect ratio
            new_banner_width = page_width
            new_banner_height = (img_height / img_width) * new_banner_width
            
            banner_rect = fitz.Rect(0, 0, new_banner_width, new_banner_height)
            
            # Insert the pre-processed transparent image
            page.insert_image(banner_rect, stream=img_bytes, overlay=True)
        
        # THIRD: Add cover page to the front if provided
        if cover_page_pdf:
            print(f"📄 Adding cover page from '{cover_page_pdf}'...")
            
            # Open the cover page PDF
            cover_doc = fitz.open(cover_page_pdf)
            
            # Create a new document that will hold everything
            final_doc = fitz.open()
            
            # First, insert all pages from the cover page PDF
            final_doc.insert_pdf(cover_doc)
            
            # Then, insert all pages from the main document (with banners)
            final_doc.insert_pdf(doc)
            
            # Close the intermediate documents
            cover_doc.close()
            doc.close()
            
            # Save the final document with cover page at front
            final_doc.save(output_pdf, garbage=4, deflate=True, clean=True)
            final_doc.close()
            
            print("✅ Cover page added to front!")
        else:
            # No cover page, just save the bannered document
            doc.save(output_pdf, garbage=4, deflate=True, clean=True)
            doc.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {input_pdf}: {e}")
        return False


def setup_google_drive():
    """
    Set up Google Drive API authentication
    
    Returns:
        service: Google Drive service object
    """
    SCOPES = ['https://www.googleapis.com/auth/drive.file']
    
    creds = None
    # The file token.json stores the user's access and refresh tokens
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    # If there are no (valid) credentials available, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = Flow.from_client_secrets_file('credentials.json', SCOPES)
            flow.redirect_uri = 'urn:ietf:wg:oauth:2.0:oob'  # For installed apps
            
            auth_url, _ = flow.authorization_url(prompt='consent')
            print('Please go to this URL and authorize the application:')
            print(auth_url)
            
            code = input('Enter the authorization code: ')
            flow.fetch_token(code=code)
            creds = flow.credentials
        
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    service = build('drive', 'v3', credentials=creds)
    return service


def create_drive_folder(service, folder_name, parent_id=None):
    """
    Create a folder in Google Drive
    
    Args:
        service: Google Drive service object
        folder_name (str): Name of the folder to create
        parent_id (str): Parent folder ID (None for root)
        
    Returns:
        str: Folder ID of created folder, or None if failed
    """
    try:
        folder_metadata = {
            'name': folder_name,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        
        if parent_id:
            folder_metadata['parents'] = [parent_id]
        
        folder = service.files().create(body=folder_metadata, fields='id').execute()
        
        # Make folder publicly accessible
        service.permissions().create(
            fileId=folder.get('id'),
            body={'role': 'reader', 'type': 'anyone'}
        ).execute()
        
        print(f"📁 Created folder: {folder_name}")
        return folder.get('id')
        
    except Exception as e:
        print(f"❌ Failed to create folder {folder_name}: {e}")
        return None


def find_or_create_folder_path(service, folder_path, root_folder_id=None):
    """
    Find or create a nested folder structure in Google Drive
    
    Args:
        service: Google Drive service object
        folder_path (str): Path like "primary/P5/2024/english"
        root_folder_id (str): Root folder ID to start from
        
    Returns:
        str: Final folder ID, or None if failed
    """
    if not folder_path:
        return root_folder_id
    
    # Split path into individual folders
    folders = folder_path.strip('/').split('/')
    current_parent_id = root_folder_id
    
    for folder_name in folders:
        # Check if folder already exists
        existing_folder_id = find_folder_by_name(service, folder_name, current_parent_id)
        
        if existing_folder_id:
            print(f"📁 Found existing folder: {folder_name}")
            current_parent_id = existing_folder_id
        else:
            # Create new folder
            current_parent_id = create_drive_folder(service, folder_name, current_parent_id)
            if not current_parent_id:
                return None
    
    return current_parent_id


def find_folder_by_name(service, folder_name, parent_id=None):
    """
    Find a folder by name in Google Drive
    
    Args:
        service: Google Drive service object
        folder_name (str): Name of folder to find
        parent_id (str): Parent folder ID to search in
        
    Returns:
        str: Folder ID if found, None otherwise
    """
    try:
        query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
        
        if parent_id:
            query += f" and parents in '{parent_id}'"
        else:
            query += " and 'root' in parents"
        
        results = service.files().list(q=query, fields='files(id, name)').execute()
        files = results.get('files', [])
        
        if files:
            return files[0]['id']
        return None
        
    except Exception as e:
        print(f"❌ Error finding folder {folder_name}: {e}")
        return None


def upload_to_google_drive(service, file_path, folder_id=None):
    """
    Upload a file to Google Drive
    
    Args:
        service: Google Drive service object
        file_path (str): Path to the file to upload
        folder_id (str): Optional folder ID to upload to
        
    Returns:
        str: File ID of uploaded file, or None if failed
    """
    try:
        filename = os.path.basename(file_path)
        
        file_metadata = {
            'name': filename
        }
        
        if folder_id:
            file_metadata['parents'] = [folder_id]
        
        media = MediaFileUpload(file_path, resumable=True)
        
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        
        # Make file publicly accessible
        service.permissions().create(
            fileId=file.get('id'),
            body={'role': 'reader', 'type': 'anyone'}
        ).execute()
        
        print(f"✅ Uploaded: {filename}")
        return file.get('id')
        
    except Exception as e:
        print(f"❌ Failed to upload {file_path}: {e}")
        return None


def generate_download_url(file_id):
    """
    Generate direct download URL for Google Drive file
    
    Args:
        file_id (str): Google Drive file ID
        
    Returns:
        str: Direct download URL
    """
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def process_all_files_with_drive_upload(input_folder, banner_img, create_folders=True, opacity=0.6, cover_page_number=True, cover_page_pdf=None):
    """
    Process all PDF files and upload them to Google Drive with organized folder structure
    
    Args:
        input_folder (str): Path to the folder containing original PDF files
        banner_img (str): Path to the banner image file
        create_folders (bool): Whether to create organized folder structure in Drive
        opacity (float): Opacity level for the banner
        cover_page_number (bool): Whether to cover page numbers
        cover_page_pdf (str): Path to cover page PDF (optional)
        
    Returns:
        dict: Mapping of filename to download URL
    """
    
    # Check if input folder exists
    if not os.path.exists(input_folder):
        print(f"❌ Error: Input folder not found at '{input_folder}'")
        return {}
    
    # Create temporary output folder
    temp_output_folder = "temp_processed"
    if not os.path.exists(temp_output_folder):
        os.makedirs(temp_output_folder)
    
    # Find all PDF files in the input folder
    all_files = glob.glob(os.path.join(input_folder, "*.pdf")) + glob.glob(os.path.join(input_folder, "*.zip"))

    
    if not all_files:
        print(f"❌ No PDF files found in '{input_folder}'")
        return {}
    
    print(f"📄 Found {len(all_files)} files to process:")
    for file_path in all_files:
        print(f"  - {os.path.basename(file_path)}")
    
    # Set up Google Drive
    print("\n🔑 Setting up Google Drive authentication...")
    try:
        service = setup_google_drive()
        print("✅ Google Drive authentication successful!")
    except Exception as e:
        print(f"❌ Failed to authenticate with Google Drive: {e}")
        return {}
    
    # Create folder structure if enabled
    target_folder_id = None
    if create_folders:
        print("\n📁 Creating folder structure in Google Drive...")
        
        # Extract folder path from input_folder
        # "public/primary/P5/2024/english/original" → "primary/P5/2024/english"
        folder_path = input_folder.replace('public/', '').replace('/original', '')
        
        target_folder_id = find_or_create_folder_path(service, folder_path)
        
        if target_folder_id:
            print(f"✅ Folder structure created/found: {folder_path}")
        else:
            print(f"❌ Failed to create folder structure, uploading to root")
    
    successful_count = 0
    failed_count = 0
    url_mapping = {}
    
    # Process each PDF file
    for file_path in all_files:
        filename = os.path.basename(file_path)
        if filename.lower().endswith('.pdf'):
            # --- Process individual PDF ---
            temp_output_path = os.path.join(temp_output_folder, filename)
            print(f"\n🔄 Processing PDF: {filename}")
            
            success = add_banner_with_pymupdf_v1(
                input_pdf=file_path,
                output_pdf=temp_output_path,
                banner_img=banner_img,
                opacity=opacity,
                cover_page_number=cover_page_number,
                cover_page_pdf=cover_page_pdf
            )
            
            if success:
                print(f"📤 Uploading to Google Drive: {filename}")
                file_id = upload_to_google_drive(service, temp_output_path, target_folder_id)
                if file_id:
                    url_mapping[filename] = generate_download_url(file_id)
                    successful_count += 1
                    os.remove(temp_output_path)
                else:
                    failed_count += 1
            else:
                failed_count += 1
        
        elif filename.lower().endswith('.zip'):
            # --- Process ZIP file ---
            file_id, download_url = process_zip_file_and_repackage(
                zip_path=file_path,
                banner_img=banner_img,
                service=service,
                target_folder_id=target_folder_id,
                opacity=opacity,
                cover_page_number=cover_page_number,
                cover_page_pdf=cover_page_pdf
            )
            if file_id and download_url:
                processed_zip_name = f"processed_{filename}"
                url_mapping[processed_zip_name] = download_url
                successful_count += 1
            else:
                failed_count += 1
    
    # Clean up temporary folder
    if os.path.exists(temp_output_folder) and not os.listdir(temp_output_folder):
        os.rmdir(temp_output_folder)
    
    # Summary
    print(f"\n📊 Processing Summary:")
    print(f"  ✅ Successfully processed and uploaded: {successful_count} files")
    print(f"  ❌ Failed: {failed_count} files")
    if create_folders and target_folder_id:
        print(f"  📁 Files organized in folder: {folder_path}")
    
    # Save URL mapping to JSON file
    if url_mapping:
        with open('url_mapping.json', 'w') as f:
            json.dump(url_mapping, f, indent=2)
        print(f"💾 URL mappings saved to 'url_mapping.json'")
    
    return url_mapping


# --- Example Usage ---
if __name__ == "__main__":
    # Define your paths (relative to project root)
    input_folder = "public/papers/secondary/2021/emath"
    banner_image = "public/papers/banner.png"
    cover_page = "public/papers/cover_page.pdf"  
    
    # Optional: Create a folder in Google Drive first and get its ID
    # drive_folder_id = "1ABC123..." # Replace with your folder ID, or None for root
    drive_folder_id = None
    
    try:
        url_mapping = process_all_files_with_drive_upload(
            input_folder=input_folder,
            banner_img=banner_image,
            create_folders=True,  # Set to False if you don't want organized folders
            opacity=0.6,
            cover_page_number=True,
            cover_page_pdf=cover_page
        )
        
        if url_mapping:
            print("\n🎉 All done! Here are your download URLs:")
            for filename, url in url_mapping.items():
                print(f"  {filename}: {url}")
            
            print("\n📝 Next steps:")
            print("1. Update your testPapers.js file with the new URLs from url_mapping.json")
            print("2. Remove the old PDF files from your public folder")
            print("3. Deploy your updated Next.js app")
        
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")