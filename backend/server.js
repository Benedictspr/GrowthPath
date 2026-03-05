require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transparent configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'GrowthPath Backend is running' });
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'benedictadurosakin@gmail.com', // Directing all submissions here
        subject: `New Lead (GrowthPath): ${subject}`,
        text: `
GrowthPath Digital Marketing - New Lead Alert

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Check server logs or email credentials.' });
    }
});

// Booking form submission route
app.post('/api/book', async (req, res) => {
    const { name, company, email, website, service, budget, meetingTime, goal } = req.body;

    if (!name || !email || !service || !budget || !meetingTime) {
        return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'benedictadurosakin@gmail.com', // Directing all submissions here
        subject: `New Consultation Booking: ${name} from ${company}`,
        text: `
New Strategy Session Booking

Name: ${name}
Company: ${company}
Email: ${email}
Website: ${website || 'N/A'}
Service Requested: ${service}
Budget: ${budget}
Meeting Date & Time: ${meetingTime}
Goal/Challenge: 
${goal}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Booking sent successfully.' });
    } catch (error) {
        console.error('Error sending booking email:', error);
        res.status(500).json({ error: 'Failed to send booking. Check server logs or email credentials.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log('Ready to receive contact form submissions!');
});
