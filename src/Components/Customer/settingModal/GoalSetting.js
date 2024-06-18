// 작성자: 박승희
// 고객현황 세팅모달의 Goal차트 데이터 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import {useCustomerStatus} from './CustomerStatusSettingContext';

const SettingModal_Goal = () => {
    const { 
        customerCount, setCustomerCount,
        customerTarget, setCustomerTarget, 
        goalOption, setGoalOption 
    } = useCustomerStatus();
    const [isEditMode, setIsEditMode] = React.useState(true);

    React.useEffect(() => {
        setGoalOption ("전체고객수");
    }, []);

    const handleGoalEditmodeClick = () => {
        setIsEditMode(false);
    }
    const formatNumber = (num) => num.toLocaleString();
    
    const handleOptionChange = (event) => {
        setGoalOption(event.target.value);
    }
    const handleInputChange = (event) => {
        const rawValue = event.target.value.replace(/,/g, '');
        setCustomerTarget(rawValue);
    }
    const handleDoubleEditmodeClick = () => {
        setIsEditMode(true);
    }
    return (
        <div>
            <h4>목표선택</h4>
            {isEditMode ? (
                <div>
                    <strong>목표 고객수</strong>&nbsp;&nbsp;
                    <input type='number'
                        style={{
                            border: 'none',
                            width: '250px',
                            textAlign: 'center'
                        }}
                        placeholder='목표 인원을 작성해주세요'
                        value={customerTarget}
                        onChange={handleInputChange} />
                    <button type="button" className="btn btn-outline-dark btn-sm" onClick={handleGoalEditmodeClick}>저장</button>
                </div>
            ) : (
                <div>
                    <strong>목표 고객수</strong>&nbsp;&nbsp;
                    <input type='text'
                        style={{
                            border: 'none',
                            width: '230px',
                            textAlign: 'right'
                        }}
                        value={formatNumber(Number(customerTarget))}
                        readOnly
                        onDoubleClick={handleDoubleEditmodeClick} />명
                </div>
            )}
            <div><strong>현재 고객수</strong>&nbsp;&nbsp;{ }
                <input type=''
                    style={{
                        border: 'none',
                        width: '230px',
                        textAlign: 'right',
                    }}
                    value={formatNumber(customerCount)}
                />명
            </div>
            <br />
            <div className='centered'>
                <label>
                    <input type='radio'
                        name="goalOption"
                        value="전체고객수"
                        checked={goalOption === '전체고객수'}
                        onChange={handleOptionChange}
                    /> 전체고객수
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input type='radio'
                        name="goalOption"
                        value="목표고객수"
                        checked={goalOption === '목표고객수'}
                        onChange={handleOptionChange} /> 당해연도 목표고객수
                </label>&nbsp;
            </div>
            <hr></hr>

        </div>
    );
}

export default SettingModal_Goal;