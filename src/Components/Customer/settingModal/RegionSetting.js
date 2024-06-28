// 작성자: 박승희
// 고객현황 세팅모달의 지역 데이터 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import LocationSelector_Provinces from './RegionAPIdataProvince'
import LocationSelector_Cities from './RegionAPIdataCities'
import {useCustomerStatus} from './CustomerStatusSettingContext';
const SettingModal_Region = () => {
    // 전국 선택시 실제 데이터: 광역시도로 데이터 세팅
    // 광역시도 선택시(예:경기도): (경기도)시군구로 데이터 세팅
    // 시군구 선택시(예: 경기도 수원시): (경기도)(수원시)읍면동 데이터로 세팅

    const {
        selectedRegion, setSelectedRegion,
        selectedProvince, setSelectedProvince,
        selectedCity, setSelectedCity,
    } = useCustomerStatus(); 

    const handleOptionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedProvince(''); // 선택 변경 시 초기화
        setSelectedCity(''); // 선택 변경 시 초기화
    }

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        if (savedSettings) {
            const { selectedRegion, selectedProvince, selectedCity } = JSON.parse(savedSettings);
            setSelectedRegion(selectedRegion || '전국');
            setSelectedProvince(selectedProvince || '');
            setSelectedCity(selectedCity || '');
            console.log('selectedProvince',selectedProvince)
            console.log('selectedCity',selectedCity)
        } else {
            setSelectedRegion('전국');
        }
    }, [setSelectedRegion, setSelectedProvince, setSelectedCity]);

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
                            checked={selectedRegion === '전국'}
                            onChange={handleOptionChange} /> 전국
                    </label> &nbsp;&nbsp;
                    <label>
                        <input
                            type='radio'
                            name="regionOption"
                            value="시도"
                            checked={selectedRegion === '시도'}
                            onChange={handleOptionChange} /> 시도
                    </label> &nbsp;&nbsp;
                    <label>
                        <input
                            type='radio'
                            name="regionOption"
                            value="시군구"
                            checked={selectedRegion === '시군구'}
                            onChange={handleOptionChange} /> 시군구
                    </label>
                </div>
                <div className="dropdown col-6">
                    {selectedRegion === '시도' && (
                        <sapn>
                            <LocationSelector_Provinces
                                onSelectProvince={setSelectedProvince}
                                selectedProvince={selectedProvince}  />
                        </sapn>
                    )}
                    {selectedRegion === '시군구' && (
                        <span>
                            <span>
                                <LocationSelector_Provinces
                                    onSelectProvince={setSelectedProvince}
                                    selectedProvince={selectedProvince} />
                            </span>&nbsp;&nbsp;
                            <span>
                                <LocationSelector_Cities
                                    selectedProvince={selectedProvince}
                                    onSelectCity={setSelectedCity}
                                    selectedCity={selectedCity}  />
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingModal_Region;