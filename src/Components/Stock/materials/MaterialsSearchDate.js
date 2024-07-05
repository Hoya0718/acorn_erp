import React from 'react';

const MaterialsSearchDate = ({ startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
    return (
        <div className="left">
            <div className="middle-buttons">
                <label htmlFor="startDate">
                    시작날짜 : <input type="date" id="startDate" max="2026-01-01" min="2021-01-01" value={startDate} onChange={handleStartDateChange} />
                </label>
                <label htmlFor="endDate">
                    종료날짜 : <input type="date" id="endDate" max="2026-01-01" min="2021-01-01" value={endDate} onChange={handleEndDateChange} />
                </label>
            </div>
        </div>
    );
};

export default MaterialsSearchDate;