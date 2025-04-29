'use client'

import SlideArrowButton from './SlideArrowButton';

export default function PageBar({
    currentPage,
    allPage,
    handlePageChange,
}: {
    currentPage: number
    allPage: number;
    handlePageChange: (newPage: number) => void;
}) {

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < allPage) {
            handlePageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-row justify-between items-center w-full bg-white rounded-lg">

            {
                currentPage > 1 ?
                <SlideArrowButton
                    direction = "left"
                    onClick = { handlePrevPage }
                    variant="primary"
                />
                :
                <div className='invisible'>
                    <SlideArrowButton
                        direction = "left"
                        onClick = { () => {} }
                        variant="primary"
                    />
                </div>
            }

            <div className="mx-10">
                <p>{currentPage}/{allPage}</p>
            </div>

            {
                currentPage < allPage ?
                <SlideArrowButton 
                    direction="right" 
                    onClick={ handleNextPage } 
                    variant="primary"
                />
                :
                <div className='invisible'>
                    <SlideArrowButton 
                        direction="right" 
                        onClick={ () => {} } 
                        variant="primary"
                    />
                </div>
            }
            
        </div>
    );
}
