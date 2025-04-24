'use client'

import { useRouter } from "next/navigation";

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
        <div className="flex flex-row justify-between items-center w-fit bg-white p-4 rounded-lg mb-4">

            {currentPage > 1 ? (
                <button
                    className="bg-orange-300 rounded-lg p-4 mb-4"
                    onClick={handlePrevPage}
                >
                    <p>prev</p>
                </button>
            ) : (
                <div className="invisible p-4 mb-4">prev</div>
            )}

            <div className="mx-10">
                <p>{currentPage}/{allPage}</p>
            </div>

            {currentPage < allPage ? (
                <button
                    className="bg-orange-300 rounded-lg p-4 mb-4"
                    onClick={handleNextPage}
                >
                    <p>next</p>
                </button>
            ) : (
                <div className="invisible p-4 mb-4">prev</div>
            )}
            
        </div>
    );
}
