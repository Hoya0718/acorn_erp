import * as React from 'react'
import "../../Main/Main.css"

const SettingModal_Region = () => {
    const [selectedOption, setSelectedOption] = React.useState('전국');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    
    return (
        <div>
            <h4>지역분류선택</h4>
            <div className='row'>
                <div class="radio col">
                    <label>
                        <input 
                            type='radio' 
                            name="regionOption"
                            value="전국"
                            checked={selectedOption === '전국'}
                            onChange={handleOptionChange} /> 전국
                    </label> &nbsp; &nbsp;
                    <label>
                        <input 
                            type='radio' 
                            name="regionOption"
                            value="시도"
                            checked={selectedOption === '시도'}
                            onChange={handleOptionChange} /> 시도
                    </label> &nbsp; &nbsp;
                    <label>
                        <input 
                            type='radio' 
                            name="regionOption"
                            value="시군구"
                            checked={selectedOption === '시군구'}
                            onChange={handleOptionChange} /> 시군구
                    </label> &nbsp; &nbsp;
                </div>
                <div class="dropdown col">
                    <select class="form-select form-select-sm" aria-label="Small select example">
                        <option selected>지역 선택</option>
                        <option value="{index+1}">One</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SettingModal_Region;