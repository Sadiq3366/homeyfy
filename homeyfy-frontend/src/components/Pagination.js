import React from "react";

const Pagination =(props)=>{
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, props.page - 2);
        const endPage = Math.min(props.TotalRecord, props.page + 2);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination-wrap">
            <nav>
                <ul className="pagination justify-content-center">
                    <button
                        type="button"
                        disabled={props.page <= 1}
                        className="btn btn-dark pagin-btn"
                        onClick={() => { props.onPageChange(props.page - 1)}}
                    >
                        &#11160;
                    </button>
                    {pageNumbers.map((page) => (
                        <li
                            key={page}
                            className={`page-item ${props.page === page ? 'active' : ''}`}
                        >
                            <a className="page-link" onClick={() => props.onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    ))}

                    <button
                        type="button"
                        disabled={props.page >= props.TotalRecord}
                        className="btn btn-dark pagin-btn"
                        onClick={() => {
                            props.onPageChange(props.page + 1)
                        }}
                    >
                    &#11162;
                    </button>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination
