// 작성자: 박승희
// 고객현황 세팅모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import Goal from './GoalSetting';
import Menu from './MenuSetting';
import Period from './PeriodSetting';
import Region from './RegionSetting';
import { useCustomerStatus } from './CustomerStatusSettingContext';

const CustomerStatusSettingModal = () => {
    const {
        customerCount_lastyear, setCustomerCount_lastyear,
        goalOption, setGoalOption,
        customerCount, setCustomerCount,
        customerTarget, setCustomerTarget,
        selectedOption, setSelectedOption,
        checkboxes_dist, setCheckboxes_dist,
        checkboxes_prod, setCheckboxes_prod,
        period, setPeriod,
        startDate, setStartDate,
        endDate, setEndDate,
        selectedRegion, setSelectedRegion,
        rangeValue, setRangeValue,
        selectedProvince, setSelectedProvince,
        selectedCity, setSelectedCity,
    } = useCustomerStatus();

    const handleSettingClick = () => {
        const settings = {
            customerCount_lastyear,
            customerCount,
            customerTarget,
            selectedOption,
            goalOption,
            period,
            startDate,
            checkboxes_dist,
            checkboxes_prod,
            endDate,
            selectedRegion,
            rangeValue,
            selectedProvince,
            selectedCity,
        };
        localStorage.setItem('customerStatusSettings', JSON.stringify(settings));
        window.location.reload();
    }
    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        if (savedSettings) {
            const {
                customerCount,
                customerCount_lastyear,
                customerTarget,
                selectedOption,
                goalOption,
                period,
                startDate,
                checkboxes_dist,
                checkboxes_prod,
                endDate,
                selectedRegion,
                rangeValue,
                selectedProvince,
                selectedCity,
            } = JSON.parse(savedSettings);

            setCustomerCount(customerCount);
            setCustomerTarget(customerTarget);
            setSelectedOption(selectedOption);
            setPeriod(period);
            setGoalOption(goalOption);
            setStartDate(startDate);
            setCheckboxes_dist(checkboxes_dist);
            setCheckboxes_prod(checkboxes_prod);
            setEndDate(endDate);
            setSelectedRegion(selectedRegion);
            setRangeValue(rangeValue);
            setCustomerCount_lastyear(customerCount_lastyear);
            setSelectedProvince(selectedProvince);
            setSelectedCity(selectedCity);

        }
        // const modalElement = modalRef.current;
        // const modalInstance = new window.bootstrap.Modal(modalElement);

        // return () => {
        //     modalInstance.dispose();
        // };
    }, [setCustomerCount, setCustomerTarget, setSelectedOption, setPeriod, setStartDate, setGoalOption, 
        setCheckboxes_dist, setCheckboxes_prod, setEndDate, setSelectedRegion, setRangeValue,
        setCustomerCount_lastyear, setSelectedProvince, setSelectedCity]);

    return (
        <div className="modal fade" id="SettingModal" tabIndex="-1" aria-labelledby="SettingModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                <form>
                    <div className="modal-content customerSettingMadal-content">
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
                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">취소</button>
                            <button type="button" className="btn btn-dark" onClick={handleSettingClick}>저장</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerStatusSettingModal;