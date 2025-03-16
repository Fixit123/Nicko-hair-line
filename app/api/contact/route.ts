import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase'; // Import the shared client
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const SALON_EMAIL = process.env.SALON_EMAIL || 'your-email@example.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill out all required fields' },
        { status: 400 }
      );
    }

    // Insert message into Supabase
    const { data, error } = await createClient()
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Send notification email to salon
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: SALON_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      
      console.log('Contact form notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send contact form notification email:', emailError);
      // We don't want to fail the form submission if just the email fails
    }

    return NextResponse.json({ 
      message: 'Message sent successfully',
      data
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error sending message' },
      { status: 500 }
    );
  }
} 