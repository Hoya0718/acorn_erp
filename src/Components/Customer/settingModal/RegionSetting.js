// 작성자: 박승희
// 고객현황 세팅모달의 지역 데이터 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import LocationSelector_Provinces from './RegionAPIdataProvince'
import LocationSelector_Cities from './RegionAPIdataCities'

const SettingModal_Region = () => {
    const [selectedOption, setSelectedOption] = React.useState('전국');
    const [selectedProvince, setSelectedProvince] = React.useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedProvince(''); // 선택 변경 시 초기화
    }

    return (
        <div>
            <h4>지역분류선택</h4>
            <div className='row'>
                <div className="radio col-6">
                    <label>
                        <input
                            type='radio'
                            name="regionOption"
                            value="전국"
                            checked={selectedOption === '전국'}
                            onChange={handleOptionChange} /> 전국
                    </label> &nbsp;&nbsp;
                    <label>
                        <input
                            type='radio'
                            name="regionOption"
                            value="시도"
                            checked={selectedOption === '시도'}
                            onChange={handleOptionChange} /> 시도
                    </label> &nbsp;&nbsp;
                    <label>
                        <input
                            type='radio'
                            name="regionOption"
                            value="시군구"
                            checked={selectedOption === '시군구'}
                            onChange={handleOptionChange} /> 시군구
                    </label>
                </div>
                <div className="dropdown col-6">
                    {selectedOption === '시도' && (
                        <sapn>
                            <LocationSelector_Provinces
                                onSelectProvince={setSelectedProvince} />
                        </sapn>
                    )}
                    {selectedOption === '시군구' && (
                        <span>
                            <span>
                                <LocationSelector_Provinces
                                    onSelectProvince={setSelectedProvince} />
                            </span>&nbsp;&nbsp;
                            <span>
                                <LocationSelector_Cities
                                    selectedProvince={selectedProvince} />
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingModal_Region;