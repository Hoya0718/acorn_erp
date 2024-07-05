import React from 'react';
import "../../Main/Main.css";
import "./Materials.css";

const MaterialsUpdate = ({ item, handleInputChange, handleSaveClick }) => {
    return (
        <>
            <td><input type="text" value={item.itemCode} onChange={(e) => handleInputChange(e, item.id, 'itemCode')} /></td>
            <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, item.id, 'itemName')} /></td>
            <td><input type="date" value={item.receiptDate} onChange={(e) => handleInputChange(e, item.id, 'receiptDate')} /></td>
            <td><input type="number" value={item.price} onChange={(e) => handleInputChange(e, item.id, 'price')} /></td>
            <td><input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, item.id, 'quantity')} /></td>
            <td><input type="number" value={item.vendorCode} onChange={(e) => handleInputChange(e, item.id, 'vendorCode')} /></td>
            <td><button className="btn1" onClick={() => handleSaveClick(item.id)}>저장</button></td>
        </>
    );
};

export default MaterialsUpdate;