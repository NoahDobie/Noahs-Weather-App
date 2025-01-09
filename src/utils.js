/**
 * Determines the number of columns and the maximum history length based on the window width and the width of each weather component.
 * @param {number} componentWidth - The width of each weather component.
 * @returns {Object} An object containing the number of columns and the maximum history length.
 */
export const getGridConfig = (componentWidth) => {
    const width = window.innerWidth;
    const columns = Math.max(1, Math.floor(width / componentWidth));
    const maxHistory = columns * 2; // Adjust this multiplier as needed
    return { columns, maxHistory };
};