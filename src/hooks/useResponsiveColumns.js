import { useState, useEffect } from 'react';

const useResponsiveColumns = () => {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setColumns(1); // Small screens (phones)
            } else if (width < 768) {
                setColumns(2); // Medium screens (tablets)
            } else if (width < 1024) {
                setColumns(3); // Large screens (small desktops)
            } else {
                setColumns(4); // Extra large screens (large desktops)
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct layout

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return columns;
};

export default useResponsiveColumns;