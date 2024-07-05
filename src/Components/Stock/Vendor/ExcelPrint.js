import { CSVLink } from 'react-csv';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const ExcelPrint = ({vendors}) => {
    // vendors 객체를 prop으로 전달받아 배열로 변환 
    const csvData = vendors.map(vendor => ({
        vendorName: vendor.vendorName,
        vendorContact: vendor.vendorContact,
        vendorAddress: vendor.vendorAddress,
        vendorRemark: vendor.vendorRemark,
        deliverableStatus: vendor.deliverableStatus ? 'Yes' : 'No'
    }));
  
      // 인쇄 기능
      const handlePrint = () => {
        window.print();
      };

  return (
    <>
        <CSVLink
            data={csvData}
            filename={"vendors.csv"}
            className="excel-button"
            target="_blank"> 
        <button><GrDocumentUpload size={16}/> 엑셀 다운</button>
        </CSVLink>
        <button onClick={handlePrint}><HiPrinter size={16}/> 인쇄</button>
    </>
  )


};

export default ExcelPrint;