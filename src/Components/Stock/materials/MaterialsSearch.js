import React from 'react';
import "../../Main/Main.css";
//import "./Materials.css";

const MaterialsSearch = ({ handleSearchChange, handleSearchClick }) => {
    return (
        <div className="right">
                <input type="text" placeholder='🔍 검색' onChange={handleSearchChange} />
                <button onClick={handleSearchClick}>조회</button>
            </div>
    );
};

export default MaterialsSearch;