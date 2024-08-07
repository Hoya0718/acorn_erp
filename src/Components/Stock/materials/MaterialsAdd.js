import React, { useState, useEffect } from 'react';


const MaterialsAdd = ({ checkAll, onAddMaterials, handleCancelClick }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [materialsData, setMaterialsData] = useState({
        materialsCode: '',
        materialsName: '',
        receiptDate: '',
        price: '',
        quantity: '',

        vendorCode: ''

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMaterialsData({ ...materialsData, [name]: value });
    };

    const handleAdd = () => {
        onAddMaterials({ ...materialsData, isChecked });
        setMaterialsData({
            materialsCode: '',
            materialsName: '',
            receiptDate: '',
            price: '',
            quantity: '',
            vendorCode: ''
        });
    };

    useEffect(() => {
        setIsChecked(checkAll);
    }, [checkAll]);

    return (
        <tr>
            <td><input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} /></td>
            <td><input type='text' placeholder='품목코드' name='materialsCode' value={materialsData.materialsCode} onChange={handleInputChange} /></td>
            <td><input type='text' placeholder='품목이름' name='materialsName' value={materialsData.materialsName} onChange={handleInputChange} /></td>
            <td><input type='date' placeholder='입고일자' name='receiptDate' value={materialsData.receiptDate} onChange={handleInputChange} /></td>

            <td><input type='number' placeholder='수량' name='quantity' value={materialsData.quantity} onChange={handleInputChange} />
            <button type=
            "submit" className="items-subTitle-button" onClick={handleAdd} style={{ marginLeft: '10px' }}>
                    ✔
            </button></td>

        </tr>
    );
};

export default MaterialsAdd;