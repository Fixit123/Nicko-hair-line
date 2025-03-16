import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase'; // Import the new client
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const SALON_EMAIL = process.env.SALON_EMAIL || 'your-email@example.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, date, time, phone } = body;
    
    // Log the received data for debugging
    console.log('Received booking data:', { name, email, service, date, time, phone });

    // Validate required fields
    if (!name || !email || !service || !date || !time || !phone) {
      console.error('Missing required booking fields:', { name, email, service, date, time, phone });
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Insert booking into Supabase
    const { data, error } = await createClient()
      .from('bookings')
      .insert([
        { 
          name, 
          email, 
          phone, 
          service, 
          booking_date: date, 
          booking_time: time 
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      );
    }

    // Send notification email to salon
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: SALON_EMAIL,
        subject: 'New Booking Request',
        html: `
          <h2>New Booking Request Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        `,
      });

      // Send confirmation email to customer
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Booking Confirmation - Nickos Hair',
        html: `
          <h2>Thank you for booking with Nickos Hair!</h2>
          <p>We have received your booking request for the following:</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p>We will confirm your appointment shortly.</p>
        `,
      });
      
      console.log('Notification emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send notification emails:', emailError);
      // We don't want to fail the booking if just the email fails
    }

    return NextResponse.json({ 
      message: 'Booking request sent successfully',
      booking: data
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing booking' },
      { status: 500 }
    );
  }
} 