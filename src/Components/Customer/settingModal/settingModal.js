import * as React from 'react';
import "../../Main/Main.css";
import Goal from './GoalSetting';
import Menu from './MenuSetting';
import Period from './PeriodSetting';
import Region from './RegionSetting';

const CustomerStatusSettingModal = () => {

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
                        <button type="button" className="btn btn-dark">저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerStatusSettingModal;