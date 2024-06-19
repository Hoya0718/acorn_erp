// 작성자: 박승희
// 고객현황 데이터 시각화 "고객유치목표" 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const Goal = () => {
    const [goalData, setGoalData] = React.useState({ goal: 0, curr: 0, goal_thisyear: 0, curr_thisyear: 0 });
    const [goalOption, setGoalOption] = React.useState('');

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        if (savedSettings) {
            const { customerTarget, customerCount, customerCount_lastyear } = JSON.parse(savedSettings);
            setGoalData({
                goal: Number(customerTarget),
                curr: Number(customerCount),
                goal_thisyear: Number(customerTarget - customerCount_lastyear),
                curr_thisyear: Number(customerCount - customerCount_lastyear)
            });
            if (goalOption) {
                setGoalOption(goalOption);
            }
        }
    }, []);

    const { goal, curr, goal_thisyear, curr_thisyear } = goalData;
    const percentage = goal > 0 ? Math.round((curr / goal) * 100) : 0;
    const percentage_thisyear = goal_thisyear > 0 ? Math.round((curr_thisyear / goal_thisyear) * 100) : 0;
    const FormatNumber = ({ value }) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    // const handleOptionChange = (event) => {
    //     const newGoalOption = event.target.value;
    //     setGoalOption(newGoalOption);
    //     const savedSettings = JSON.parse(localStorage.getItem('customerStatusSettings')) || {};
    //     savedSettings.goalOption = newGoalOption;
    //     localStorage.setItem('customerStatusSettings', JSON.stringify(savedSettings));
    // };
    const displayGoal = goalOption === '전체고객수' ? goal : goal_thisyear;
    const displayCurr = goalOption === '전체고객수' ? curr : curr_thisyear;
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
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percentage}%` }}
                                aria-valuenow={displayPercentage} aria-valuemin="0" aria-valuemax="100">
                                <span style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: percentage > 50 ? '#fff' : 'darkgray',
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