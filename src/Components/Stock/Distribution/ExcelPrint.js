import React from 'react';
import { CSVLink } from 'react-csv';

const ExcelPrint = ({ distributions }) => {
  const csvData = distributions.map(distribution => ({
    distributionName: distribution.distributionName,
    receiptDate: distribution.receiptDate, 
    orderQty: distribution.orderQty,
    initialQty: distribution.initialQty,
    receivedQty: distribution.receivedQty,
    releaseQty: distribution.releaseQty,
    currentQty: distribution.currentQty,
    expectedReceiptDate: distribution.expectedReceiptDate
  }));

  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <CSVLink
        data={csvData}
        filename={"distributions.csv"}
        className="excel-button"
        target="_blank">
        <button>엑셀 다운</button>
      </CSVLink>
      <button onClick={handlePrint}>인쇄</button>
    </>
  )
};

export default ExcelPrint;
