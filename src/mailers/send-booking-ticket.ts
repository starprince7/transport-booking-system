import sendMail from '../services/mail-service';

type TicketMailer = {
  to: string;
  info: any;
};

export default async function mailBookingTicket({ to, info }: TicketMailer) {
  const mailOptions = {
    to,
    from: 'Bus Booking System <system@princenweke.com>',
    subject: 'Your Bus Ticket',
    text: "Here's your ticket, testing...",
  };

  try {
    const success = await sendMail(mailOptions);
    return { success, error: null };
  } catch (error) {
    return { error, success: null };
  }
}
