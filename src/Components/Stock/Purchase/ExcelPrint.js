import { CSVLink } from 'react-csv';

const ExcelPrint = ({purchases}) => {
    // vendors 객체를 prop으로 전달받아 배열로 변환 
    const csvData = purchases.map(purchase => ({
      purchaseName: purchase.purchaseName,
      purchaseUnit: purchase.purchaseUnit,
      orderDate: purchase.orderDate,
      orderQty: purchase.orderQty,
      price: purchase.price,
      remark: purchase.remark
    }));
  
      // 인쇄 기능
      const handlePrint = () => {
        window.print();
      };

  return (
    <>
        <CSVLink
            data={csvData}
            filename={"purchases.csv"}
            className="excel-button"
            target="_blank"> 
        <button>엑셀 다운</button>
        </CSVLink>
        <button onClick={handlePrint}>인쇄</button>
    </>
  )


};

export default ExcelPrint;