import * as React from 'react'
import "../../Main/Main.css"
import PeriodSearch from '../status_data/PeriodSearch'

const SettingModal_Period = () => {
    const [selectedOption, setSelectedOption] = React.useState('1year');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    return (
        <div>
            <h4>기간선택</h4>
            <div className="customer-status-period-serchbox">

                <div className="radio centered">
                    <label>
                        <input
                            type="radio"
                            name="search_for"
                            value="3months"
                            checked={selectedOption === '3months'}
                            onChange={handleOptionChange}
                            onClick={() => { }} />&nbsp;3개월&nbsp;&nbsp;
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="search_for"
                            value="6months"
                            checked={selectedOption === '6months'}
                            onChange={handleOptionChange}
                            onClick={() => { }} />&nbsp;6개월&nbsp;&nbsp;
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="search_for"
                            value="1year"
                            checked={selectedOption === '1year'}
                            onChange={handleOptionChange}
                            onClick={() => { }} />&nbsp;1년&nbsp;&nbsp;
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="search_for"
                            value="custom"
                            checked={selectedOption === 'custom'}
                            onChange={handleOptionChange}
                            onClick={() => { }} />&nbsp;사용자 지정<br />
                    </label>

                </div>
                <div className="date centered">
                    {/* 사용자 지정 체크 여부에 따라 활성화 */}
                    <input type="date" id="startDate" disabled />&nbsp;~&nbsp;
                    <input type="date" id="endDate" disabled />&nbsp;
                </div>
            </div>
            <hr></hr>
        </div>

    );
}

export default SettingModal_Period;