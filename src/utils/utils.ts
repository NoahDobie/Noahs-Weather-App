/**
 * Detects the system theme (light or dark).
 * @returns {string} The system theme ('light' or 'dark').
 */
export const detectSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Interpolates a temperature color from blue (cold) to red (hot) based on the temperature value.
 * @param {number} temperature - The temperature value.
 * @returns {string} The interpolated color.
 */
export const getTemperatureColor = (temperature: number): string => {
    // Define the color range
    const colors: [number, number, number][] = [
        [0, 0, 255],    // Blue (cold)
        [135, 206, 235], // Light Blue
        [0, 0, 128],    // Navy Blue
        [255, 255, 0],  // Yellow
        [255, 165, 0],  // Orange
        [255, 0, 0],    // Red
        [139, 0, 0]     // Dark Red (hot)
    ];

    // Normalize the temperature value (assuming temperature range from -10 to 40 degrees Celsius)
    // anything not in this range will be clamped to the min or max value
    const minTemp = -10;
    const maxTemp = 40;

    const clampedTemp = Math.max(minTemp, Math.min(temperature, maxTemp));
    const normalizedTemp = (clampedTemp - minTemp) / (maxTemp - minTemp);
    const colorIndex = Math.min(Math.floor(normalizedTemp * (colors.length - 1)), colors.length - 1);
    const colorFraction = (normalizedTemp * (colors.length - 1)) - colorIndex;

    // Interpolate the color
    const interpolatedColor = colors[colorIndex].map((startColor, index) => {
        const endColor = colors[colorIndex + 1][index];
        return Math.round(startColor + (endColor - startColor) * colorFraction);
    });

    // Convert the interpolatedColor array to a CSS rgb string format
    return `rgb(${interpolatedColor.join(',')})`;
};

/**
 * Fits the text to the container width by adjusting the font size.
 * Ensures some padding on each side so that it does not touch the edges.
 * @param {string} text - The text to fit.
 * @param {number} containerWidth - The width of the container.
 * @param {number} initialFontSize - The initial font size.
 * @param {number} minFontSize - The minimum font size.
 * @param {number} padding - The padding on each side.
 * @returns {number} The adjusted font size.
 */
export const fitTextToContainer = (text: string, containerWidth: number, initialFontSize: number, minFontSize: number, padding: number = 15): number => {
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.fontSize = `${initialFontSize}px`;
    tempElement.innerText = text;
    document.body.appendChild(tempElement);

    let fontSize = initialFontSize;
    const adjustedContainerWidth = containerWidth - 2 * padding;
    while (tempElement.offsetWidth > adjustedContainerWidth && fontSize > minFontSize) {
        fontSize -= 1;
        tempElement.style.fontSize = `${fontSize}px`;
    }

    document.body.removeChild(tempElement);
    return fontSize;
};