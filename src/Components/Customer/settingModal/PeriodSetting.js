// 작성자: 박승희
// 고객현황 세팅모달의 기간차트 데이터 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import {useCustomerStatus} from './CustomerStatusSettingContext';

const SettingModal_Period = () => {
    const { 
        startDate, setStartDate, 
        endDate, setEndDate, 
        selectedOption, setSelectedOption 
    } = useCustomerStatus();
   
    const [isAbled, setIsAbled] = React.useState(false);

    const datas = ['3개월', '6개월', '1년', '사용자 지정']

    React.useEffect(() => {
        const now = new Date();
        const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // 오늘 날짜로 설정
        setEndDate(today);
        
        const calculateStartDate = (monthsAgo) => {
            const date = new Date();
            date.setMonth(date.getMonth() - monthsAgo);
            return date.toISOString().split('T')[0];
        };

        switch (selectedOption) {
            case '3개월':
                setStartDate(calculateStartDate(3));
                setIsAbled(false);
                break;
            case '6개월':
                setStartDate(calculateStartDate(6));
                setIsAbled(false);
                break;
            case '1년':
                setStartDate(calculateStartDate(12));
                setIsAbled(false);
                break;
            case '사용자 지정':
                setIsAbled(true);
                setStartDate('');
                setEndDate(today);
                break;
            default:
                setIsAbled(false);
                setStartDate('');
                setEndDate(today);
                break;
        }
    }, [selectedOption]);
    React.useEffect(() => {
        // 초기값 설정
        setSelectedOption('1년');
    }, [setSelectedOption]);
    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setIsAbled(value === '사용자 지정')
    }
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }
    return (
        <div>
            <h4>기간선택</h4>
            <div className="customer-status-period-serchbox">
                <div className="radio centered">
                    {datas.map((data) => (
                        <label key={data}>
                            <input
                                type="radio"
                                name="search_for"
                                value={data}
                                checked={selectedOption === data}
                                onChange={handleOptionChange}
                            />&nbsp;{data}&nbsp;&nbsp;
                        </label>
                    ))}
                </div>
                <div className="date centered">
                    {/* 사용자 지정 체크 여부에 따라 활성화 */}
                    <input type="date" id="startDate" disabled={!isAbled} value={startDate} onChange={handleStartDateChange}/>&nbsp;~&nbsp;
                    <input type="date" id="endDate" disabled={!isAbled} value={endDate} onChange={handleEndDateChange} />&nbsp;
                </div>
            </div>
            <hr></hr>
        </div>

    );
}

export default SettingModal_Period;