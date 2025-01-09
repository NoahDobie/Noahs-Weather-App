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

/**
 * Interpolates a temperature color from blue (cold) to red (hot) based on the temperature value.
 * @param {number} temperature - The temperature value.
 * @returns {string} The interpolated color.
 */
export const getTemperatureColor = (temperature) => {
    // Define the color range
    const colors = [
        [0, 0, 255],    // Blue (cold)
        [135, 206, 235], // Light Blue
        [0, 0, 128],    // Navy Blue
        [0, 255, 127],  // Lime/Teal
        [255, 255, 0],  // Yellow
        [255, 165, 0],  // Orange
        [255, 0, 0],    // Red
        [139, 0, 0]     // Dark Red (hot)
    ];

    // Normalize the temperature value (assuming temperature range from -10 to 40 degrees Celsius)
    const minTemp = -10;
    const maxTemp = 40;
    const normalizedTemp = (temperature - minTemp) / (maxTemp - minTemp);
    const colorIndex = Math.min(Math.floor(normalizedTemp * (colors.length - 1)), colors.length - 2);
    const colorFraction = (normalizedTemp * (colors.length - 1)) - colorIndex;

    // Interpolate the color
    const interpolatedColor = colors[colorIndex].map((startColor, index) => {
        const endColor = colors[colorIndex + 1][index];
        return Math.round(startColor + (endColor - startColor) * colorFraction);
    });

    // Convert the color to a CSS rgb string
    return `rgb(${interpolatedColor.join(',')})`;
};