// 작성자: 박승희
// 고객현황 세팅모달의 Goal차트 데이터 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Popover } from 'bootstrap'; // 명시적으로 Popover 가져오기
import { useCustomerStatus } from './CustomerStatusSettingContext';

const SettingModal_Goal = () => {

    const {
        customerCount_lastyear,
        customerCount,
        customerTarget, setCustomerTarget,
        goalOption, setGoalOption,
    } = useCustomerStatus();
    const [isEditMode, setIsEditMode] = React.useState(false);

    // React.useEffect(() => {
    //     setGoalOption("전체고객수");
    // }, []);
    React.useEffect(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));
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
    const getDisplayValues = () => {
        if (goalOption === "전체고객수") {
            return {
                targetLabel: "목표 고객수",
                targetValue: formatNumber(Number(customerTarget)),
                currentLabel: "현재 고객수",
                currentValue: formatNumber(customerCount)
            };
        } else {
            const targetThisYear = Number(customerTarget) - Number(customerCount_lastyear);
            const currentThisYear = Number(customerCount) - Number(customerCount_lastyear);
            return {
                targetLabel: "당해연도 목표 고객수",
                targetValue: formatNumber(targetThisYear),
                currentLabel: "현재 달성 고객수",
                currentValue: formatNumber(currentThisYear)
            };
        }
    }
    const { targetLabel, targetValue, currentLabel, currentValue } = getDisplayValues();
    return (
        <div>
            <h4>목표선택</h4>
            <br></br>
            {isEditMode ? (
                <div className='row'
                style={{marginBottom: '8px'}}>
                    <div className='col-4'>
                        <strong>{targetLabel}</strong>&nbsp;&nbsp;
                    </div>
                    <div className='col-8'>
                        <input type='number'
                            style={{
                                border: 'none',
                                width: '200px',
                                textAlign: 'center',
                                fontSize:"11px"
                            }}
                            placeholder='목표 인원을 작성해주세요'
                            value={customerTarget}
                            onChange={handleInputChange} />
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={handleGoalEditmodeClick}>저장</button>
                    </div>
                </div>
            ) : (
                <div className='row'
                style={{marginBottom: '8px'}}>
                    <div className='col-4'>
                        <strong>{targetLabel}</strong>
                    </div>
                    <div className='col-8'>
                        <input type='text'
                            data-bs-toggle="popover"
                            data-bs-placement="top"
                            data-bs-content=
                            "[당해연도 목표 고객수] 목표 인원에서 전년도 실제인원을 제외하고 보여집니다."
                            style={{
                                border: 'none',
                                width: '200px',
                                textAlign: 'right',
                                backgroundColor: 'transparent',
                                color: 'black',
                                fontSize:"11px"
                            }}
                            value={targetValue}
                            readOnly
                            onDoubleClick={handleDoubleEditmodeClick} />명
                    </div>
                </div>
            )}

            <div className='row'>
                <div className='col-4'>
                    <strong>{currentLabel}</strong>
                </div>
                <div className='col-8'>
                    <input type=''
                        style={{
                            border: 'none',
                            width: '200px',
                            textAlign: 'right',
                                fontSize:"11px"
                        }}

                        value={currentValue}
                    />명
                </div>
            </div>
            <br />
            <div className='centered'>
                <label>
                    <input type='radio'
                        name="goalOption"
                        value="전체고객수"
                        checked={goalOption === "전체고객수"}
                        onChange={handleOptionChange}
                    /> 전체고객수
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input type='radio'
                        name="goalOption"
                        value="목표고객수"
                        checked={goalOption === "목표고객수"}
                        onChange={handleOptionChange} /> 당해연도 목표고객수
                </label>&nbsp;
            </div>
            <hr></hr>

        </div>
    );
}

export default SettingModal_Goal;