import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, profession, startDate, groupType } = body;

    // Validate required fields
    if (!name || !phone || !email || !profession || !startDate || !groupType) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
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
Group Type: ${groupType}

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
      return NextResponse.json(
        { 
          success: true, 
          message: 'Form submitted successfully. We will contact you soon.' 
        },
        { status: 200 }
      );
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

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully. We will contact you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
