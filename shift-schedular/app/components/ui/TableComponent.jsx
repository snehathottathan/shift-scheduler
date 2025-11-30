"use client"
import { useEffect, useState } from "react"
import './TableComponent.scss'
export default function TableComponent({ columns, data, onDelete, onEdit,limit }) {

    useEffect(() => {
        /**Reset to first page on new data */
        setCurrentPage(1);

    }, [data])

    /**State to manage current page */
    const [currentPage, setCurrentPage] = useState(1)

    /**Find total pages */
    const totalPages = Math.ceil(data.length / limit)
const safeData = Array.isArray(data) ? data : [];
    // Get only the rows for the current page
    const paginatedData = safeData?.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    /**Function to calculate nextpage */
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    /**Function to calculate previouspage */
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <table>
                <thead>

                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.title}</th>
                        ))}
                        <th>Actions</th>
                    </tr>


                </thead>
                <tbody>

                    {paginatedData&&paginatedData.map((val) => {
                        return (

                            <tr>
                                <td>{val.Name}</td>
                                <td className="actions">

                                    <i className="bi bi-pencil" style={{ paddingLeft:'10px'}}
                                    onClick={() => {
                                            onEdit(val.id);
                                        }}
                                    ></i>
                                    <i
                                        className="bi bi-trash" style={{color:'red', paddingLeft:'10px'}}
                                        onClick={() => {
                                            onDelete(val.id);
                                        }}
                                    ></i>

                                </td>

                            </tr>

                        )
                    })}


                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={prevPage}>
                    Prev
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button disabled={currentPage === totalPages} onClick={nextPage}>
                    Next
                </button>
            </div>
        </>
    )
}