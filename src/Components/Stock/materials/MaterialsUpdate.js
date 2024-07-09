import React from 'react';
import "../../Main/Main.css";
//import "./Materials.css";

const MaterialsUpdate = ({ item, handleInputChange, handleSaveClick }) => {
    return (
        <>
            <td><input type="text" value={item.materialsCode} onChange={(e) => handleInputChange(e, item.id, 'materialsCode')} /></td>
            <td><input type="text" value={item.materialsName} onChange={(e) => handleInputChange(e, item.id, 'materialsName')} /></td>
            <td><input type="date" value={item.receiptDate} onChange={(e) => handleInputChange(e, item.id, 'receiptDate')} /></td>
            <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, item.id, 'quantity')} />
            <button type=
            "submit" className="items-subTitle-button" onClick={() => handleSaveClick(item.id)} style={{ marginLeft: '10px' }}>
                    ✔
            </button>
            </td>
        </>
    );
};

export default MaterialsUpdate;