import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { email, phone, eventName = 'Lead' } = req.body;

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  // Meta requires email/phone to be hashed with SHA-256 and lowercase
  const hash = (value) =>
    value ? crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex') : undefined;
  
  const [firstName, ...rest] = (req.body.name || '').trim().split(' ');
  const lastName = rest.join(' ');
  
  const user_data = {
    em: hash(email),
    ph: hash(phone),
    fn: hash(firstName),
    ln: hash(lastName),
    country: 'sg',
    client_ip_address: ip,
    client_user_agent: userAgent,
  };
  

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: req.headers.referer || 'https://www.lioncitytutors.com/',
        user_data,
        action_source: 'website',
        test_event_code: 'TEST31390' 
      },
    ],
  };

  const url = `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`;

  try {
    const fbRes = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const fbData = await fbRes.json();

    if (!fbRes.ok) {
      console.error('Meta CAPI Error:', fbData);
      return res.status(500).json({ error: 'Failed to send to Facebook', details: fbData });
    }

    return res.status(200).json({ success: true, fbResponse: fbData });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
