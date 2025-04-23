'use client'

import { useRouter } from "next/navigation";

export default function PageBar({
    allPage,
    handlePageChange,
}: {
    allPage: number;
    handlePageChange: (newPage: number) => void;
}) {
    const router = useRouter();
    const currentPage = parseInt(new URLSearchParams(window.location.search).get("page") || "1");

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
            router.push(`?page=${currentPage - 1}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < allPage) {
            handlePageChange(currentPage + 1);
            router.push(`?page=${currentPage + 1}`);
        }
    };

    return (
        <div className="flex flex-row justify-between items-center w-fit bg-white p-4 rounded-lg mb-4">

            <button
                className="bg-orange-300 rounded-lg p-4 mb-4"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                <p>prev</p>
            </button>

            <div className="mx-10">
                <p>{currentPage}</p>
            </div>
            
            <button
                className="bg-orange-300 rounded-lg p-4 mb-4"
                onClick={handleNextPage}
                disabled={currentPage === allPage}
            >
                <p>next</p>
            </button>
        </div>
    );
}
