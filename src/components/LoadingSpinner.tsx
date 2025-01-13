import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

/**
 * LoadingSpinner component renders a loading spinner using react-spinners by David Hu
 * 
 * @component
 * @example
 * return (
 *   <LoadingSpinner />
 * )
 * 
 * @returns {JSX.Element} A JSX element representing the loading spinner.
 */
const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <GridLoader color="#006287" size={24} />
        </div>
    );
}

export default LoadingSpinner;