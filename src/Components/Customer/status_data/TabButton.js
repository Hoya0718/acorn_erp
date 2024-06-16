import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const CustomerTableTabButton = ({ activeTab, setActiveTab }) => {
  // const [activeTab, setActiveTab] = React.useState('distribution'); // 활성화된 탭 상태
  const [distributionLabel, setDistributionLabel] = React.useState('고객분포');
  const [productLabel, setProductLabel] = React.useState('상품별');
  const [rankingLabel, setRankingLabel] = React.useState('고객랭킹');

  const distributionLabels = ['고객분포', '성별', '지역별', '연령별'];
  const productLabels = ['상품별', '최고매출', '최다거래', '반응좋은'];
  const rankingLabels = ['고객랭킹', '최고금액고객', '최다거래고객'];

  //버튼 클릭시 버튼명 변경하는 함수(고객분포, 상품별, 고객랭킹)
  const handleDistributionClick = () => {
    setActiveTab('distribution');
    setRankingLabel(rankingLabels[0]);
    setProductLabel(productLabels[0]);
    setDistributionLabel((prev) => {
      const currentIndex = distributionLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % distributionLabels.length;
      return distributionLabels[nextIndex];
    });
  };
  const handleProductClick = () => {
    setActiveTab('product');
    setDistributionLabel(distributionLabels[0]);
    setRankingLabel(rankingLabels[0]);
    setProductLabel((prev) => {
      const currentIndex = productLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % productLabels.length;
      return productLabels[nextIndex];
    });
  };
  const handleRankingClick = () => {
    setActiveTab('ranking');
    setDistributionLabel(distributionLabels[0]);
    setProductLabel(productLabels[0]);
    setRankingLabel((prev) => {
      const currentIndex = rankingLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % rankingLabels.length;
      return rankingLabels[nextIndex];
    });
  };

  return (
    <div className="customer-table-tabbutton">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'distribution' ? 'active' : ''}`}
            aria-current="page"
            onClick={handleDistributionClick}
            style={{ color: `${activeTab === 'distribution' ? '#71AAB2' : 'gray'}` }}
            href="#">
            {distributionLabel}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'product' ? 'active' : ''}`}
            onClick={handleProductClick}
            style={{ color: `${activeTab === 'product' ? '#71AAB2' : 'gray'}` }}
            href="#">
            {productLabel}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={handleRankingClick}
            style={{ color: `${activeTab === 'ranking' ? '#71AAB2' : 'gray'}` }}
            href="#">
            {rankingLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CustomerTableTabButton;