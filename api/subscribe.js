// Vercel serverless function
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const apiKey = process.env.BREVO_API_KEY;

        if (!apiKey) {
            console.error('BREVO_API_KEY is not set in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                email: email,
                listIds: [7], // Change this to your actual list ID if needed
                updateEnabled: true,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ message: 'Subscribed successfully!' });
        } else {
            console.error('Brevo API error:', data);
            return res.status(response.status).json({ 
                message: data.message || 'Error subscribing',
                details: data
            });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            details: error.message
        });
    }
}