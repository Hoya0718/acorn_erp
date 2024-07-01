import React, { useState } from 'react';
import ModalForm from './ModalForm';

const IncomeRegistrationModal = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    proNo: '',
    proDsc: '',
    pronm: '',
    cusnm: '',
    proDtm: '',
    paySts: '',
    pay: '',
    unitPay: '',
    proNumber: '',
    etc: '',
  });

  const columns = [
    { header: "상품번호", key: "proNo" },
    { header: "상품구분", key: "proDsc" },
    { header: "상품명", key: "pronm" },
    { header: "매입처", key: "cusnm" },
    { header: "거래일시", key: "proDtm" },
    { header: "결제상태", key: "paySts" },
    { header: "금액", key: "pay" },
    { header: "단가", key: "unitPay" },
    { header: "수량", key: "proNumber" },
    { header: "특이사항", key: "etc" },
  ];

  const handleModalShow = () => {
    const selectedData = data.find(row => row.checked);
    if (selectedData) {
      setFormData(selectedData);
      setShowModal(true);
    } else {
      alert('수정할 항목을 선택해주세요.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      proNo: '',
      proDsc: '',
      pronm: '',
      cusnm: '',
      proDtm: '',
      paySts: '',
      pay: '',
      unitPay: '',
      proNumber: '',
      etc: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'unitPay' || name === 'proNumber') {
      const unitPay = parseFloat(updatedFormData['unitPay']) || 0;
      const proNumber = parseFloat(updatedFormData['proNumber']) || 0;
      updatedFormData['pay'] = (unitPay * proNumber).toString();
    }

    setFormData(updatedFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map((row) =>
      row.checked ? { ...formData, checked: row.checked } : row
    );
    setData(updatedData);
    handleModalClose();
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedData = data.filter((row) => !row.checked);
      setData(updatedData);
      window.alert('삭제가 완료되었습니다.');
    }
  };

  return (
    <>
      <div className="righted" style={{ textAlign: 'right', marginTop: '10px' }}>
        <input type="button" value="거래명세서 수정 >" className="btn btn-dark mr-2" onClick={handleModalShow} />
        <input type="button" value="삭제 >" className="btn btn-dark" onClick={handleDelete} />
      </div>
      <ModalForm
        show={showModal}
        handleClose={handleModalClose}
        handleInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
        formData={formData}
        columns={columns}
        modalContent="거래명세서 수정"
      />
    </>
  );
};

export default IncomeRegistrationModal;
