import crypto from 'crypto';

export async function POST(req) {
  const body = await req.json();
  const { email, phone, name = '', eventName = 'Lead' } = body;

  const ip = req.headers.get('x-forwarded-for') || '';
  const userAgent = req.headers.get('user-agent') || '';

  const hash = (value) =>
    value ? crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex') : undefined;

  const [firstName, ...rest] = name.trim().split(' ');
  const lastName = rest.join(' ');

  const user_data = {
    em: hash(email),
    ph: hash(phone),
    client_ip_address: ip || null,
    client_user_agent: userAgent || null,
    country: [hash('sg')],
    fn: [hash(firstName)],
    ln: [hash(lastName)],
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'system_generated',
        user_data,
      },
    ],
  };

  const url = `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`;

  try {
    console.log('Sending Meta CAPI payload:', JSON.stringify(payload, null, 2));

    const fbRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const fbData = await fbRes.json();
    console.log('Meta CAPI Response:', fbData);

    if (!fbRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to send to Facebook', details: fbData }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, fbResponse: fbData }), {
      status: 200,
    });
  } catch (err) {
    console.error('API Error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}
