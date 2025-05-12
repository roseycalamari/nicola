const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

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

        if (response.ok) {
            res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter' });
        } else {
            throw new Error(data.message || 'Subscription failed');
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
}; 