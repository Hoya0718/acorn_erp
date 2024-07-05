// 작성자: 박승희
// 고객현황 데이터 시각화 메인 페이지

import * as React from 'react'
import "../../Main/Main.css"
import Rank from './RankChart.js'
import Dist from "./DistChart.js"
import Goal from './GoalChart.js'
import TopProd from './TopProdChart.js'
import "../Customer.css"

const CustomerMain = () => {
//맨위로 버튼 만들다: 실패
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='CustomerMain'style={{ display: "flex", width: "100%", margin:"auto"}}>
      <div className="content" style={{ display: "flex", paddingTop: "15px", paddingBottom: "15px" , width: "100%", margin:"auto"}}>
        <section id="sec"style={{ width: "100%", margin:"auto"}}>
          <div className="row first">
            {/*고객수목표 달성도*/}
            <div className="col-xl-3 col-lg-12 goal" style={{ marginTop: "10px" }}>{/*칸이 작아지면 수직정렬*/}
              <Goal />
            </div>
            {/*고객분포도*/}
            <div className="col-xl-9 col-lg-12 dist" style={{ marginTop: "10px" }}>
              <Dist />
            </div>
          </div>
          {/*상품별 선호도 내용*/}
          <div className="row second" id="section1" style={{ marginTop: "20px" }}>
            <TopProd />
          </div>
          {/*고객구매실적*/}
          <div className="row third rank" style={{ marginTop: "20px", paddingBottom: "15px" }}>
            <Rank />
          </div>
        </section>
      </div>
      {showButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          맨 위로
        </button>
      )}
    </div>
  );
}

export default CustomerMain;