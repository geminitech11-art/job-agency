import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, phone, email, profession, startDate } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !profession || !startDate) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create email content
    const emailSubject = `New Contact Form Submission - ${name}`;
    const emailBody = `
New Contact Form Submission from Gemini Bau Website

Name: ${name}
Phone: ${phone}
Email: ${email}
Profession: ${profession}
Start Date: ${startDate}

---
This email was sent from the Gemini Bau contact form.
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Check if email credentials are configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local');
      console.log('Email that would be sent:', {
        to: 'geminitech11@gmail.com',
        subject: emailSubject,
        body: emailBody
      });
      
      // Still return success to user, but log the issue
      return res.status(200).json({ 
          success: true, 
          message: 'Form submitted successfully. We will contact you soon.' 
        });
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Send email
    await transporter.sendMail({
      from: gmailUser,
      to: 'geminitech11@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
    });

    console.log('Email sent successfully to geminitech11@gmail.com');

    return res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully. We will contact you soon.' 
      });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      });
  }
}
