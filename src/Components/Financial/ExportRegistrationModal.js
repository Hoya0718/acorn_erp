import React, { useState } from 'react';
import ModalForm from './ModalForm';

const ExportRegistrationModal = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [formData, setFormData] = useState({
    "상품번호": '',
    "상품구분": '',
    "상품명": '',
    "고객명": '',
    "거래일시": '',
    "결제상태": '완료',
    "금액": '',
    "단가": '',
    "수량": '',
    "특이사항": '',
  });

  const handleModalShow = () => {
    const selectedData = data.find(row => row.checked);
    if (selectedData) {
      setFormData(selectedData);
      setModalContent('거래명세서 작성');
      setShowModal(true);
    } else {
      alert('수정할 항목을 선택해주세요.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      "상품번호": '',
      "상품구분": '',
      "상품명": '',
      "고객명": '',
      "거래일시": '',
      "결제상태": '완료',
      "금액": '',
      "단가": '',
      "수량": '',
      "특이사항": '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    if (modalContent === '거래명세서 작성') {
      setData([...data, { ...formData, checked: false }]);
    } else if (modalContent === '수정') {
      const updatedData = data.map((row) =>
        row.checked ? { ...formData, checked: row.checked } : row
      );
      setData(updatedData);
    }
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
        <input type="button" value="거래명세서 작성 >" className="btn btn-dark mr-2" onClick={handleModalShow} />
        <input type="button" value="삭제 >" className="btn btn-dark" onClick={handleDelete} />
      </div>
      <ModalForm
        show={showModal}
        handleClose={handleModalClose}
        handleInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
        formData={formData}
        columns={Object.keys(formData)}
        modalContent={modalContent}
      />
    </>
  );
};

export default ExportRegistrationModal;
