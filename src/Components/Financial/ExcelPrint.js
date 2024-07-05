import React from 'react';
import { CSVLink } from 'react-csv';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const ExcelPrint = ({ combinedData }) => {
    // combinedData를 prop으로 전달받아 배열로 변환하여 CSV 데이터 준비
    const csvData = combinedData.map(data => ({
        itemCode: data.itemCode,
        itemType: data.itemType,
        itemName: data.itemName,
        orderDate: data.orderDate,
        orderStatus: data.orderStatus,
        orderTotalPrice: data.orderTotalPrice,
        orderPrice: data.orderPrice,
        itemQty: data.itemQty
    }));

    // 인쇄 기능
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="excel-print">
            <CSVLink
                data={csvData}
                filename={"purchases.csv"}
                className="excel-button"
                target="_blank"
            >
                <button><GrDocumentUpload size={16}/> 엑셀 다운</button>
            </CSVLink>
            <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
        </div>
    );
};

export default ExcelPrint;
