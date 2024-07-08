import React from 'react';
import ExcelPrint from '../modules/ExcelPrint';
import CustomerStatusPagination from '../modules/PaginationModule';

const MgmtBottomMenu = ({
    totalItems, rowsPerPage, currentPage, setCurrentPage,
    filteredData, filename, columns
}) => {


    return (
        <div className='row'>
            <div className='col'>
            <CustomerStatusPagination
                totalItems={totalItems}
                itemsPerPage={rowsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            </div>
            <div className='col'>
            <ExcelPrint
                printData={filteredData}
                columns={columns}
                filename={filename}
            />
            </div>
        </div>
    );
};

export default MgmtBottomMenu;
