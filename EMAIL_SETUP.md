# Email Setup Instructions

To connect the contact form to your Gmail account, you have several options:

## Option 1: Using Resend (Recommended - Easiest)

1. Sign up at [Resend.com](https://resend.com)
2. Get your API key
3. Install Resend:
   ```bash
   npm install resend
   ```
4. Create `.env.local` file:
   ```
   RESEND_API_KEY=your_resend_api_key
   ```
5. Update `app/api/contact/route.ts` to use Resend (see example in the file)

## Option 2: Using Nodemailer with Gmail SMTP

1. Install Nodemailer:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. Create `.env.local` file:
   ```
   GMAIL_USER=geminitech11@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   ```

3. Generate Gmail App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"

4. Update `app/api/contact/route.ts` with Nodemailer code:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// In the POST function:
await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: 'geminitech11@gmail.com',
  subject: emailSubject,
  text: emailBody,
});
```

## Option 3: Using EmailJS (Client-side)

1. Sign up at [EmailJS.com](https://www.emailjs.com)
2. Connect your Gmail account
3. Get your Service ID, Template ID, and Public Key
4. Install EmailJS:
   ```bash
   npm install @emailjs/browser
   ```
5. Update the contact form to use EmailJS directly (client-side)

## Current Implementation

The current API route is already configured to use Nodemailer with Gmail SMTP. To enable email sending:

1. **Create a `.env.local` file** in the root directory of your project:
   ```
   GMAIL_USER=geminitech11@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   ```

2. **Generate a Gmail App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Click on **Security** in the left sidebar
   - Under "How you sign in to Google", click **2-Step Verification** (you must have this enabled)
   - Scroll down and click **App passwords**
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "JobAgency Website")
   - Click **Generate**
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
   - Paste it in your `.env.local` file (without spaces)

3. **Restart your development server** after creating/updating `.env.local`:
   ```bash
   npm run dev
   ```

4. **Test the form** - Submit the contact form and check your Gmail inbox at `geminitech11@gmail.com`

**Important Notes:**
- The `.env.local` file should NOT be committed to git (it's already in `.gitignore`)
- If you don't set up the environment variables, the form will still show success but emails won't be sent (check the console for warnings)
- Make sure 2-Step Verification is enabled on your Google account before generating an App Password

