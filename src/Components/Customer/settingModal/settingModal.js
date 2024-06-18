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
        customerCount, setCustomerCount,
        customerTarget, setCustomerTarget,
        selectedOption, setSelectedOption,
        checkboxes_dist, setCheckboxes_dist,
        checkboxes_prod, setCheckboxes_prod,
        period, setPeriod,
        startDate, setStartDate,
        endDate, setEndDate,
        selectedRegion, setSelectedRegion,
        rangeValue, setRangeValue
    } = useCustomerStatus();

    const modalRef = React.useRef(null);

    const handleSettingClick = () => {
        const settings = {
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
        };
        // 설정값 localStorage에 저장
        localStorage.setItem('customerStatusSettings', JSON.stringify(settings));
        // // 모달 닫기
        // if (modalRef.current) {
        //     const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
        //     modalInstance.hide();
        // }

        window.location.reload();
    }
    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        if (savedSettings) {
            const {
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
            } = JSON.parse(savedSettings);

            setCustomerCount(customerCount);
            setCustomerTarget(customerTarget);
            setSelectedOption(selectedOption);
            setPeriod(period);
            setStartDate(startDate);
            setCheckboxes_dist(checkboxes_dist);
            setCheckboxes_prod(checkboxes_prod);
            setEndDate(endDate);
            setSelectedRegion(selectedRegion);
            setRangeValue(rangeValue);

        }
        // const modalElement = modalRef.current;
        // const modalInstance = new window.bootstrap.Modal(modalElement);

        // return () => {
        //     modalInstance.dispose();
        // };
    }, [setCustomerCount, setCustomerTarget, setSelectedOption, setPeriod, setStartDate, setCheckboxes_dist, setCheckboxes_prod, setEndDate, setSelectedRegion, setRangeValue]);

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
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">취소</button>
                        <button type="button" className="btn btn-dark" onClick={handleSettingClick}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerStatusSettingModal;