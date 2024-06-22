import React from 'react';
import "../../Main/Main.css";
import "./Distribution.css";

const DistributionUpdate = ({ item, handleInputChange, handleSaveClick }) => {
    return (
            <>
                <td><input type="text" name="code" value={item.code} onChange={(e) => handleInputChange(e, item.id, 'code')} /></td>
                <td><input type="text" name="name" value={item.name} onChange={(e) => handleInputChange(e, item.id, 'name')} /></td>
                <td><input type="text" name="entryDate" value={item.entryDate} onChange={(e) => handleInputChange(e, item.id, 'entryDate')} /></td>
                <td><input type="text" name="entryQuantity" value={item.entryQuantity} onChange={(e) => handleInputChange(e, item.id, 'entryQuantity')} /></td>
                <td><input type="text" name="initialStock" value={item.initialStock} onChange={(e) => handleInputChange(e, item.id, 'initialStock')} /></td>
                <td><input type="text" name="exitQuantity" value={item.exitQuantity} onChange={(e) => handleInputChange(e, item.id, 'exitQuantity')} /></td>
                <td><input type="text" name="totalStock" value={item.totalStock} onChange={(e) => handleInputChange(e, item.id, 'totalStock')} /></td>
                <td><input type="text" name="plannedEntryDate" value={item.plannedEntryDate} onChange={(e) => handleInputChange(e, item.id, 'plannedEntryDate')} /></td>
                <td><button className="btn1" onClick={() => handleSaveClick(item.id)}>저장</button></td>
            </>

    );
};

export default DistributionUpdate; 