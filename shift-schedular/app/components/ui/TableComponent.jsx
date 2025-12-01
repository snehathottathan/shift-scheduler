"use client"

import { useEffect, useState } from "react"

import './TableComponent.scss'

export default function TableComponent({ columns, data, onDelete, onEdit, limit, onLimitChange }) {

    useEffect(() => {

        /**Reset to first page on new data */
        setCurrentPage(1);

    }, [data, limit])

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

    /**
     * Function to calculate previouspage
     */
    const prevPage = () => {

        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>

            <div>

                <div style={{ margin: "10px 0" }}>

                    <label style={{ marginRight: "6px" }}>Show</label>

                    <select

                        value={limit}

                        onChange={(e) => onLimitChange?.(Number(e.target.value))}

                        style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #ccc" }}

                    >
                        <option value={5}>5</option>

                        <option value={10}>10</option>

                        <option value={20}>20</option>

                        <option value={50}>50</option>

                    </select>

                    <span style={{ marginLeft: "6px" }}>entries</span>

                </div>

            </div>

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

                    {paginatedData && paginatedData.map((val, key) => {

                        return (

                            <tr key={val.id}>

                                {columns.map(col => (

                                    <td key={col.key}>

                                        {val[col.key] ?? "—"}

                                    </td>

                                ))}

                                <td className="actions">

                                    <i className="bi bi-pencil" style={{ paddingLeft: '10px' }}

                                        onClick={() => {

                                            onEdit(val.id);

                                        }}

                                    ></i>

                                    <i
                                        className="bi bi-trash" style={{ color: 'red', paddingLeft: '10px' }}

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

            <div className="pagination-main">

                <div className="pagination"> Showing {paginatedData.length} of {safeData.length}</div>

                <div className="pagination-buttons">

                    <button className="page-button" disabled={currentPage === 1} onClick={prevPage}>

                        Previous

                    </button>

                    <span style={{ color: '#9575DE', backgroundColor: '#F7F3FF', width: '16px' }}>

                        {currentPage}

                    </span>

                    <button className="page-button" disabled={currentPage === totalPages} onClick={nextPage}>

                        Next

                    </button>

                </div>

            </div>

        </>

    )
}