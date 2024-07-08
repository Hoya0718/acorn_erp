import { CSVLink } from 'react-csv';
import { GrDocumentUpload } from "react-icons/gr";
import { HiPrinter } from "react-icons/hi2";
import {Button} from 'react-bootstrap';

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
    <div className="righted uppered">
        <CSVLink
            data={csvData}
            filename={`${filename}.csv`}
            className="excel-button"
            target="_blank"> 
          <Button 
          style={{paddingTop: '8px', paddingBottom: '8px', paddingLeft: '15px', paddingRight: '15px'}}
          >
            <GrDocumentUpload size={16}/> 엑셀 다운
          </Button>
        </CSVLink>
        &nbsp;&nbsp;&nbsp;
        <Button 
          onClick={handlePrint} 
          style={{paddingTop: '8px', paddingBottom: '8px', paddingLeft: '15px', paddingRight: '15px'}}
        >
          <HiPrinter size={16}/> 
          인쇄
        </Button>
    </div>
  )


};

export default ExcelPrint;