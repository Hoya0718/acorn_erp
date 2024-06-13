import * as React from 'react'
import "../../Main/Main.css"
import Rank from './Rank.js'
import CustomerTable from './CustomerTable.js'
import Dist from "./Dist.js"
import Goal from './Goal.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const CustomerMain = () => {
  return (
    <div>
          <div className="right">
            <div className="right-up" style={{marginBottom: "-15px"}}>
              {/*상단 내용*/}
              <div className="row">
                <div className="col-5 centered-right-content " >
                  <input type="submit" className="btn btn-outline-primary centered-right-content" value="데이터"
                    onClick={() => (window.location.href = '/')}/>
                </div>
                <div className="col-1 centered-content">
                  <FontAwesomeIcon icon={faGear} />
                </div>
              </div>
            </div>
            <div className="right-mid" style={{display: "flex", paddingTop: "15px"}}>
              <section id="sec">
                <div>
                  <div>
                    <div className="row">
                      {/*고객수목표 달성도*/}
                      <div className="col-xl-3 col-lg-12" style={{marginTop: "10px"}}>{/*칸이 작아지면 수직정렬*/}
                        <Goal></Goal>
                      </div>
                      {/*고객분포도*/}
                      <div className="col-xl-9 col-lg-12" style={{marginTop: "10px"}}>
                        <Dist></Dist>
                      </div>
                    </div>
                  </div>
                  {/*상품별 선호도 내용*/}
                  <div className="row" id="section1" style={{marginTop: "20px"}}>
                  </div>

                  {/*고객구매실적*/}
                  <div className="row" style={{marginTop: "20px"}}>
                    <Rank></Rank>
                  </div>
                </div>
              </section>
            </div>
          </div>
    </div>
  );
}

export default CustomerMain;