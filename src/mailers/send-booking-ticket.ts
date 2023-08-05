import sendMail from '../services/mail-service';
import formatToCurrency from '../utilities/formatCurrency';

type TicketMailer = {
  to: string;
  bookingInfo: any;
};

export default async function mailBookingTicket({
  to,
  bookingInfo,
}: TicketMailer) {
  const bus = bookingInfo.bus;
  const mailOptions = {
    to,
    from: 'Bus Booking System <mail-system@princenweke.com>',
    subject: 'Your Bus Ticket',
    template: 'bus_quest_booking_ticket',
    'v:fullName': bookingInfo.passengerName,
    'v:amountPaid': formatToCurrency(bookingInfo.price),
    'v:bookingDate': bookingInfo.bookingDate,
    'v:departureDate': bookingInfo.departureDate,
    'v:departureTerminal': bus.origin,
    'v:arrival': bus.destination,
    'v:registrationNumber': bus.registrationNumber,
    'v:busId': bus._id,
  };

  try {
    const success = await sendMail(mailOptions);
    return { success, error: null };
  } catch (error) {
    return { error, success: null };
  }
}
