export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    const apiKey = process.env.BREVO_API_KEY;
  
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [7], // Change this to your actual list ID if needed
      }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      res.status(200).json({ message: 'Subscribed successfully!' });
    } else {
      res.status(response.status).json({ message: data.message || 'Error subscribing' });
    }
  }