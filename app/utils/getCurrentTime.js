export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire

    return `${hours}:${minutes}:${seconds}`; // Format HH:MM:SS
}