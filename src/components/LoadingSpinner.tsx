import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

/**
 * 
 * Using @davidhu2000/react-spinners package to create a cool loading spinner
 * found on github here: https://github.com/davidhu2000/react-spinners
 * 
 * ALL CREDIT GOES TO THE AUTHOR OF THE PACKAGE FOR THIS SPINNER!!!
 * 
 */

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