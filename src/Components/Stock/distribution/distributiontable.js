import React from 'react';

const DistributionTable = ({ 
    items, 
    selectedItems, 
    showNewItemForm, 
    handleCheckboxChange, 
    handleRegisterClick, 
    handleInputChange, 
    newItem, 
    handleCancelClick,
    handleEditClick,
    handleSaveClick,
    editingItemId
}) => {
    return (
        <table className='distribution-table'>
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={() => {}} disabled /></th>
                    <th>품목코드</th>
                    <th>품목이름</th>
                    <th>입고일자</th>
                    <th>입고수량</th>
                    <th>기초재고</th>
                    <th>출고수량</th>
                    <th>집계재고</th>
                    <th>입고예정일</th>
                    {showNewItemForm && <th></th>}
                </tr>
            </thead>
            <tbody>
                {showNewItemForm && (
                    <tr className="new-item-form">
                        <td></td>
                        <td><input type="text" name="code" value={newItem.code} onChange={handleInputChange} /></td>
                        <td><input type="text" name="name" value={newItem.name} onChange={handleInputChange} /></td>
                        <td><input type="text" name="entryDate" value={newItem.entryDate} onChange={handleInputChange} /></td>
                        <td><input type="text" name="entryQuantity" value={newItem.entryQuantity} onChange={handleInputChange} /></td>
                        <td><input type="text" name="initialStock" value={newItem.initialStock} onChange={handleInputChange} /></td>
                        <td><input type="text" name="exitQuantity" value={newItem.exitQuantity} onChange={handleInputChange} /></td>
                        <td><input type="text" name="totalStock" value={newItem.totalStock} onChange={handleInputChange} /></td>
                        <td><input type="text" name="plannedEntryDate" value={newItem.plannedEntryDate} onChange={handleInputChange} /></td>
                        <td><button className="btn1" onClick={handleRegisterClick}>추가</button>
                        <button className="btn1" onClick={handleCancelClick}>취소</button></td>
                    </tr>
                )}
                {items.map(item => (
                    <tr key={item.id} className="new-item-form">
                        <td><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                        {editingItemId === item.id ? (
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
                        ) : (
                            <>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.entryDate}</td>
                                <td>{item.entryQuantity}</td>
                                <td>{item.initialStock}</td>
                                <td>{item.exitQuantity}</td>
                                <td>{item.totalStock}</td>
                                <td>{item.plannedEntryDate}</td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DistributionTable;