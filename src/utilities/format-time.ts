// Helper function to format time in AM/PM (12-hour clock format)
export function formatTimeIn12HourFormat(dateParam: Date | string): string {
  if (dateParam instanceof Date) {
    const hours = dateParam.getHours();
    const minutes = dateParam.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } else {
    const dateObj = new Date(dateParam);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
