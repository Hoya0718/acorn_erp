import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"

const Goal = () => {
    const [goalData, setGoalData] = React.useState({ 
        name: '도토리묵 빵집', 
        goal: '1000',
        curr: '600' });
        const { name, goal, curr } = goalData;
        const percentage = Math.round((curr / goal) * 100);
        const FormatNumber = ({ value }) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    return (
        <div className="c_goal">
            <section>
                <div className='title'>
                    <h3>고객 유치 목표 달성도</h3>
                </div>
                <div className="app-card app-card-stat shadow-sm h-100 content" style={{ backgroundColor: 'white' }}>
                    <div className="app-card-body p-3 p-lg-4">
                        {/* <!-- 앱바디 안쪽 여백 등 글자 정렬 --> */}
                        현재 {name}의 등록 고객은 {FormatNumber({ value: goal })}명 입니다.<br /><br />
                        {/* <!-- 달성도 바 -->*/}
                        <div className="progress" style={{ height: '30px' }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percentage}%`}}
                                aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">{percentage}%
                            </div>
                        </div><br />
                        <div className="row">
                            <div className="col">
                                <h4>목표</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5>{FormatNumber({ value: goal })}명</h5>
                            </div>
                        </div>	<br />
                        <div className="row">
                            <div className="col">
                                <h4>현재</h4>
                            </div>
                            <div className="col centered-right-content">
                                <h5> {FormatNumber({ value: curr })}명</h5>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <h4>{percentage >= 50 ? `이제 목표까지 ${100 - percentage}% 남았습니다!` : `목표를 벌써 ${percentage}% 달성했어요!`}</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Goal;