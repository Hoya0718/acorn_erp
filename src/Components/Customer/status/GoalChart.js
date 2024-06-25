// 작성자: 박승희
// 고객현황 데이터 시각화 "고객유치목표" 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import { useCustomerStatus } from '../settingModal/CustomerStatusSettingContext'; 

const Goal = () => {
    const { customerCount, customerTarget, customerCount_lastyear, goalOption } = useCustomerStatus();

    const goal_thisyear = customerTarget - customerCount_lastyear;
    const curr_thisyear = customerCount - customerCount_lastyear;

    const percentage = customerTarget > 0 ? Math.round((customerCount / customerTarget) * 100) : 0;
    const percentage_thisyear = goal_thisyear > 0 ? Math.round((curr_thisyear / goal_thisyear) * 100) : 0;

    const FormatNumber = ({ value }) => {
        if (typeof value !== 'number' || isNaN(value)) {
            return "0";
        }
        return value.toLocaleString();
    };

    const displayGoal = goalOption === '전체고객수' ? customerTarget : goal_thisyear;
    const displayCurr = goalOption === '전체고객수' ? customerCount : curr_thisyear;
    const displayPercentage = goalOption === '전체고객수' ? percentage : percentage_thisyear;

    return (
        <div className="c_goal">
            <section>
                <div className='title'>
                    <h3>고객 유치 목표 달성도</h3>
                </div>
                <div className="app-card app-card-stat shadow-sm h-100 content" style={{ backgroundColor: 'white' }}>
                    <div className="app-card-body p-3 p-lg-4">
                        {/* <!-- 달성도 바 -->*/}
                        <div className="progress" style={{ height: '30px', position: 'relative' }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${displayPercentage}%` }}
                                aria-valuenow={displayPercentage} aria-valuemin="0" aria-valuemax="100">
                                <span style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: displayPercentage > 50 ? '#fff' : 'darkgray',
                                    fontWeight: 'bold'
                                }}>
                                    {displayPercentage}%
                                </span>
                            </div>
                        </div><br />
                        <div className="row">
                            <div className="col">
                                <h4>목표</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5>{FormatNumber({ value: displayGoal })}명</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4>현재</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5> {FormatNumber({ value: displayCurr })}명</h5>
                            </div>
                        </div>
                        <div className="row">
                            <h6>{displayPercentage >= 50 ? `이제 목표까지 ${100 - displayPercentage}% 남았습니다!` : `목표를 벌써 ${displayPercentage}% 달성했어요!`}</h6>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Goal;