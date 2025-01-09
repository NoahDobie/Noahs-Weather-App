import React from 'react';

/**
 * LoadingSpinner component renders a loading spinner with a gradient border.
 * 
 * @component
 * @example
 * return (
 *   <LoadingSpinner />
 * )
 * 
 * @returns {JSX.Element} A JSX element representing the loading spinner.
 */
function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center">
            <div
                className="mt-10 h-12 w-12 border-4 rounded-full animate-spin"
                style={{
                    borderImageSource: 'linear-gradient(45deg, #006287, #FFFFFF)',
                    borderImageSlice: 1,
                }}
            ></div>
        </div>
    );
}

export default LoadingSpinner;