import React from 'react';
import "../../Main/Main.css";
import "./Distribution.css";

const DistributionUpdate = ({ item, handleInputChange, handleSaveClick }) => {
    return (
        <>
            <td><input type="text" value={item.itemCode} onChange={(e) => handleInputChange(e, item.id, 'itemCode')} /></td>
            <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, item.id, 'itemName')} /></td>
            <td><input type="date" value={item.receiptDate} onChange={(e) => handleInputChange(e, item.id, 'receiptDate')} /></td>
            <td><input type="number" value={item.orderQty} onChange={(e) => handleInputChange(e, item.id, 'orderQty')} /></td>
            <td><input type="number" value={item.initialQty} onChange={(e) => handleInputChange(e, item.id, 'initialQty')} /></td>
            <td><input type="number" value={item.receivedQty} onChange={(e) => handleInputChange(e, item.id, 'receivedQty')} /></td>
            <td><input type="number" value={item.releaseQty} onChange={(e) => handleInputChange(e, item.id, 'releaseQty')} /></td>
            <td><input type="number" value={item.currentQty} onChange={(e) => handleInputChange(e, item.id, 'currentQty')} /></td>
            <td><input type="date" value={item.expectedReceiptDate} onChange={(e) => handleInputChange(e, item.id, 'expectedReceiptDate')} /></td>
            <td><button className="btn1" onClick={() => handleSaveClick(item.id)}>저장</button></td>
        </>
    );
};

export default DistributionUpdate;