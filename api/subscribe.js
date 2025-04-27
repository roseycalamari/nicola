export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                email: email,
                listIds: [2],
                attributes: {
                    FIRSTNAME: '',
                    LASTNAME: ''
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to subscribe');
        }

        return res.status(200).json({ message: 'Successfully subscribed' });
    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({ message: 'Failed to subscribe' });
    }
} 