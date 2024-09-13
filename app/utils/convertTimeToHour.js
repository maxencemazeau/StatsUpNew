export const convertTimeToHour = (time) => {
    // Split the time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Convert to decimal hours
    const decimalHours = hours + (minutes / 60) + (seconds / 3600);

    return decimalHours;
}
