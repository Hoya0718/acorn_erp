import * as React from 'react'
import "../../Main/Main.css"

const CustomerTable = () => {
  const [distributionLabel, setDistributionLabel] = React.useState('고객분포');
  const [productLabel, setProductLabel] = React.useState('상품별');
  const [rankingLabel, setRankingLabel] = React.useState('고객랭킹');

  const distributionLabels = ['고객분포', '성별', '지역별', '연령별'];
  const productLabels = ['상품별', '최고매출', '최다거래', '반응좋은'];
  const rankingLabels = ['고객랭킹', '최고금액고객', '최다거래고객'];

  //버튼 클릭시 버튼명 변경하는 함수(고객분포, 상품별, 고객랭킹)
  const handleDistributionClick = () => {
    setDistributionLabel((prev) => {
      const currentIndex = distributionLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % distributionLabels.length;
      return distributionLabels[nextIndex];
    });
  };
  const handleProductClick = () => {
    setProductLabel((prev) => {
      const currentIndex = productLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % productLabels.length;
      return productLabels[nextIndex];
    });
  };
  const handleRankingClick = () => {
    setRankingLabel((prev) => {
      const currentIndex = rankingLabels.indexOf(prev);
      const nextIndex = (currentIndex + 1) % rankingLabels.length;
      return rankingLabels[nextIndex];
    });
  };

  return  (
    <div>
      <div className="right-mid">
        <section id="sec">
          <div className="row">
            <div className="col-6">
            <ul class="nav nav-underline">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page"  onClick={handleDistributionClick} href="#">{distributionLabel}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={handleProductClick} href="#">{productLabel}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={handleRankingClick} href="#">{rankingLabel}</a>
              </li>
            </ul>
            </div>
            <div className="col-6" id="search_box">
              <div className="radio righted">
                <input type="radio" name="search_for" id="3months" onClick={() => {}} />&nbsp;3개월&nbsp;&nbsp;
                <input type="radio" name="search_for" id="6months" onClick={() => {}} />&nbsp;6개월&nbsp;&nbsp;
                <input type="radio" name="search_for" id="1year" onClick={() => {}} />&nbsp;1년&nbsp;&nbsp;
                <input type="radio" name="search_for" id="custom" onClick={() => {}} />&nbsp;사용자 지정<br />
              </div>
              <div className="date righted">
                {/* 사용자 지정 체크 여부에 따라 활성화 */}
                <input type="date" id="startDate" disabled />&nbsp;~&nbsp;
                <input type="date" id="endDate" disabled />&nbsp;
                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                  <input type="text" id="keyword" className="form-control" placeholder="검색" />
                </div>&nbsp;
                <input type="submit" value="조회 >" className="btn btn-dark" />
              </div>
            </div>
          </div>
          <table className="table table-hover" style={{ wordBreak: 'break-all' }}>
            <thead>
              <tr>
                <th scope="col">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </th>
                <th scope="col">번호</th>
                <th scope="col">주문번호</th>
                <th scope="col">거래일자</th>
                <th scope="col">상품명</th>
                <th scope="col">판매수량</th>
                <th scope="col">판매금액</th>
                <th scope="col">고객명</th>
                <th scope="col">고객아이디</th>
                <th scope="col">생년월일</th>
                <th scope="col">성별</th>
                <th scope="col">연령그룹</th>
                <th scope="col">지역그룹</th>
                <th scope="col">특이사항</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">
                  <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="orderNum" />
                </th>
                <th scope="row">{/* 번호 */}</th>
                <td>{/* 주문번호 */}</td>
                <td>{/* 거래일자 */}</td>
                <td>{/* 상품명 */}</td>
                <td>{/* 판매수량 */}</td>
                <td>{/* 판매금액 */}</td>
                <td>{/* 고객명 */}</td>
                <td>{/* 고객아이디 */}</td>
                <td>{/* 생년월일 */}</td>
                <td>{/* 성별 */}</td>
                <td>{/* 연령그룹 */}</td>
                <td>{/* 지역그룹 */}</td>
                <td>{/* 특이사항 */}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default CustomerTable;