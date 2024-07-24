
export const FormattedDate = (datePart) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(today.getDate()).padStart(2, '0');

    const formats = {
        year: year,
        month: month,
        day: day,
        fullDate: `${year}-${month}-${day}`,
    };

    return formats[datePart]
}