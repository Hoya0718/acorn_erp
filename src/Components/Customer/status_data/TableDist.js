// 작성자: 박승희
// 고객현황 데이터 페이지 고객분포도 테이블 컴포넌트

import * as React from 'react'
import "../../Main/Main.css"
import TableModule from "../modules/TableModule"

const CustomerStatusTable_Dist = ({ activeLabel }) => {
  // 예제 데이터를 rows 배열에 추가
  const [rows, setRows] = React.useState([
    { region_seoul: '200', region_jeju:'1', region_kyungsang:'10', region_junla:'10', region_chungcheong:'15', region_gyunggi:'30', region_kangwon:'1', female: '1000', male: '50',  age_10: '10', age_20:'20', age_30:'30', age_40:'40', age_50:'45', age_60:'60',age_70:'80'},
    
    // 필요한 만큼 데이터를 추가
  ]);
  const getColumns = (activeLabel) => {
    switch (activeLabel) {
      case '성별':
        return [
          { header: '여성', key: 'female', className: 'table-centered' },
          { header: '남성', key: 'male', className: 'table-centered' },
           ];
      case '연령별':
        return [
          { header: '10대이하', key: 'age_10', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '20대', key: 'age_20', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '30대', key: 'age_30', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '40대', key: 'age_40', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '50대', key: 'age_50', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '60대', key: 'age_60', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '70대이상', key: 'age_70', format: (value) => value.toLocaleString(), className: 'table-centered' },
        ];
      case '지역별':
        return [
          { header: '서울', key: 'region_seoul', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '경기', key: 'region_gyunggi', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '강원', key: 'region_kangwon', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '충청', key: 'region_chungcheong', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '전라', key: 'region_junla', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '경상', key: 'region_kyungsang', format: (value) => value.toLocaleString(), className: 'table-centered' },
          { header: '제주', key: 'region_jeju', format: (value) => value.toLocaleString(), className: 'table-centered' },
        ];
        default:
          return [
            { header: '서울', key: 'region_seoul', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '경기', key: 'region_gyunggi', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '강원', key: 'region_kangwon', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '충청', key: 'region_chungcheong', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '전라', key: 'region_junla', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '경상', key: 'region_kyungsang', format: (value) => value.toLocaleString(), className: 'table-centered' },
            { header: '제주', key: 'region_jeju', format: (value) => value.toLocaleString(), className: 'table-centered' },
          ];
    };
  }

  React.useEffect(() => {
    handleTable(activeLabel);
  }, [activeLabel]);

  const handleTable = (label) => {
    let sortedRows = [...rows];
    if (label === '최고금액고객') {
      sortedRows.sort((a, b) => b.orderAmount - a.orderAmount);
    }
    if (label === '최다거래고객') {
      sortedRows.sort((a, b) => b.orderCount - a.orderCount);
    }
    setRows(sortedRows);
  }

  return (
    <div>
      <TableModule data={rows} columns={getColumns(activeLabel)} />
    </div>
  );
}

export default CustomerStatusTable_Dist;