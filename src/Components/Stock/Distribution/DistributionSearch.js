import React from 'react';
import "../../Main/Main.css";
import "./Distribution.css";

const DistributionSearch = ({ handleSearchChange, handleSearchClick }) => {
    return (
        <div className="right">
            <div className="middle-buttons">
                <input type="text" placeholder='🔍︎검색' onChange={handleSearchChange} />
                <button onClick={handleSearchClick}>조회</button>
            </div>
        </div>
    );
};

export default DistributionSearch;