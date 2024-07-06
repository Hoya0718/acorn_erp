import { CSVLink } from 'react-csv';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";

const ExcelPrint = ({printData, columns, filename}) => {
    // vendors 객체를 prop으로 전달받아 배열로 변환 
    const csvData = printData.map(data => {
      const rowData = {};
      columns.forEach(column => {
        rowData[column.header] = data[column.accessor||column.key] || '';
      });
      // console.log("columns",columns)
      // console.log("rowData",rowData)
      return rowData;
    });
  
      // 인쇄 기능
      const handlePrint = () => {
        window.print();
      };

  return (
    <div style={{margin: "10px"}}>
        <CSVLink
            data={csvData}
            filename={`${filename}.csv`}
            className="excel-button"
            target="_blank"> 
          <button>
            <GrDocumentUpload size={16}/> 엑셀 다운
          </button>
        </CSVLink>
        <button onClick={handlePrint}><HiPrinter size={16}/> 
          인쇄
        </button>
    </div>
  )


};

export default ExcelPrint;