import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

const testPaperLeadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  downloads: [{
    subject: String,
    year: String,
    level: String,
    downloadedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const TestPaperLead = mongoose.models.TestPaperLead || mongoose.model('TestPaperLead', testPaperLeadSchema);

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const { email, phone, subject, year, level } = data;

    let lead = await TestPaperLead.findOne({ email });
    if (lead) {
      lead.downloads.push({ subject, year, level });
      await lead.save();
    } else {
      lead = new TestPaperLead({
        email,
        phone,
        downloads: [{ subject, year, level }]
      });
      await lead.save();
    }
    return NextResponse.json({ success: true, message: 'Download tracked successfully!' });
  } catch (err) {
    console.error('Error tracking download:', err);
    return NextResponse.json({ success: false, error: 'Failed to track download.' }, { status: 500 });
  }
}
