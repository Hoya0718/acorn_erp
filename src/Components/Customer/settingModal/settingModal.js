// 작성자: 박승희
// 고객현황 세팅모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import Goal from './GoalSetting';
import Menu from './MenuSetting';
import Period from './PeriodSetting';
import Region from './RegionSetting';
import {useCustomerStatus} from './CustomerStatusSettingContext';

const CustomerStatusSettingModal = () => {
    const { 
        customerCount, setCustomerCount,
        customerTarget, setCustomerTarget,
        selectedOption, setSelectedOption,
        period, setPeriod,
        startDate, setStartDate,
        checkboxes_dist, setCheckboxes_dist,
        checkboxes_prod, setCheckboxes_prod,
        endDate, setEndDate,
        selectedRegion, setSelectedRegion,
        rangeValue, setRangeValue
    } = useCustomerStatus();

const handleSettingClick=()=>{
      console.log({
        customerCount, 
        customerTarget, 
        selectedOption, 
        period, 
        startDate, 
        checkboxes_dist,
        checkboxes_prod,
        endDate, 
        selectedRegion, 
        rangeValue, 
    });
}
    return (
        <div className="modal fade" id="SettingModal" tabIndex="-1" aria-labelledby="SettingModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="SettingModalLabel">설정</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <Goal />
                            <Period />
                            <Menu />
                            <Region />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal"c>취소</button>
                        <button type="button" className="btn btn-dark"onClick={handleSettingClick}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerStatusSettingModal;