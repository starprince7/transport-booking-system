import sendMail from '../services/mail-service';

type CancellationMailer = {
  to: string;
};

export default async function sendBookingCancellationMail({
  to,
}: CancellationMailer) {
  const mailOptions = {
    to,
    from: 'Bus Booking System <system@princenweke.com>',
    subject: 'Your Bus Ticket Has Been Cancelled',
    text: 'Dear passenger, your tickect has been cancelled.',
  };

  try {
    const success = await sendMail(mailOptions);
    return { success, error: null };
  } catch (error) {
    return { error, success: null };
  }
}
