export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Call Brevo API
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [7],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Subscription failed');
    }

    return res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
} 