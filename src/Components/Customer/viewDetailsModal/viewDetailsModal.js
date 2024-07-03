// 작성자: 박승희
// 고객관리 세부사항보기 모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import { Modal, Button } from 'react-bootstrap';
import instance from './../../../api/axios';

const ViewDetailsModal = ({ show, onHide, data }) => {
    const [formData, setFormData] = React.useState(data);
    const [customerNotes, setCustomerNotes] = React.useState('');
    const [editableFields, setEditableFields] = React.useState({});

    React.useEffect(() => {
        setFormData(data);
    }, [data]);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleSaveChanges = async () => {
        const formattedData = {
            ...formData,
            customerBirthDate: new Date(formData.customerBirthDate),
            registerDate: new Date(formData.registerDate)
        };
    
        console.log(formData.customerId)
        console.log(formattedData)
        try {
            const responsePut = await instance.put(`/customer/info/${formData.customerId}`, formattedData);
            const responseGrade = await instance.put(`/customer/grade/${formData.customerId}`, formattedData);
            
            console.log( formattedData)
            if (customerNotes) {
                const responsePost = await instance.post('/customer/saveNotes', {
                    customerId: formData.customerId,
                    notes: customerNotes
                });
                console.log('POST response:', responsePost);
            }

            onHide(); // 모달 닫기

        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleDoubleEditModeClick = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: true
        });
    };
    const handleBlur = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: false
        });
    };
    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <div className="modal-content">
                    <Modal.Header closeButton>
                        <Modal.Title>고객 현황</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>이름</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.customerName || ''}
                                            name="customerName"
                                            style={{
                                                border: 'none',
                                                textAlign: 'center',
                                            }}
                                            // readOnly={!editableFields.customerName}
                                            onDoubleClick={() => handleDoubleEditModeClick('customerName')}
                                            onBlur={() => handleBlur('customerName')}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>성별</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.customerGender || ''}
                                            name="customerGender"
                                            style={{
                                                border: 'none',
                                                textAlign: 'center',
                                            }}
                                            // readOnly={!editableFields.customerGender}
                                            onDoubleClick={() => handleDoubleEditModeClick('customerGender')}
                                            onBlur={() => handleBlur('customerGender')}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>생년월일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={formatDateForInput(formData.customerBirthDate) || ''}
                                            name="customerBirthDate"
                                            style={{
                                                border: 'none',
                                                textAlign: 'lefted',
                                            }}
                                            // readOnly={!editableFields.customerBirthDate}
                                            onDoubleClick={() => handleDoubleEditModeClick('customerBirthDate')}
                                            onBlur={() => handleBlur('customerBirthDate')}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>연락처</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.customerTel || ''}
                                            style={{
                                                border: 'none',
                                                textAlign: 'center',
                                            }}
                                            // readOnly={!editableFields.customerTel}
                                            onDoubleClick={() => handleDoubleEditModeClick('customerTel')}
                                            onBlur={() => handleBlur('customerTel')}
                                            onChange={handleInputChange}
                                            name="customerTel"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>주소</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="customerAddr"
                                            className="form-control"
                                            value={formData.customerAddr || ''}
                                            style={{
                                                border: 'none',
                                                textAlign: 'center',
                                            }}
                                            // readOnly={!editableFields.customerAddr}
                                            onDoubleClick={() => handleDoubleEditModeClick('customerAddr')}
                                            onBlur={() => handleBlur('customerAddr')}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>가입일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="date"
                                            name="registerDate"
                                            className="form-control"
                                            value={formatDateForInput(formData.registerDate) || ''}
                                            style={{
                                                border: 'none',
                                                textAlign: 'lefted',
                                            }}
                                            // readOnly={!editableFields.resisterDate}
                                            onDoubleClick={() => handleDoubleEditModeClick('registerDate')}
                                            onBlur={() => handleBlur('registerDate')}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>회원등급</label>
                                    </div>
                                    <div className="col-md-3">
                                        <select 
                                            value={formData.customerGrade || ''}
                                            name="customerGrade"
                                            // onDoubleClick={() => handleDoubleEditModeClick('customerGrade')}
                                            // onBlur={() => handleBlur('customerGrade')}
                                            onChange={handleInputChange}
                                        >
                                            <option>우수</option>
                                            <option>일반</option>
                                            <option>주의</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-3  centered">
                                        <label> 특이사항</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='특이사항을 입력하세요!'
                                            value={customerNotes}
                                            onChange={(e) => setCustomerNotes(e.target.value)}
                                        />
                                        {Array.isArray(formData.customerNotes) && formData.customerNotes.map((note, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className="row">
                                                    <div className="col-md-3  centered">
                                                        {formatDateForInput(note.notesDate)}
                                                    </div>
                                                    <div className="col-md-9  centered">
                                                        <input
                                                            type="text"
                                                            name="customerNotes"
                                                            className="form-control"
                                                            value={note.notes}
                                                            style={{
                                                                border: 'none',
                                                                textAlign: 'lefted',
                                                            }}
                                                            onDoubleClick={() => handleDoubleEditModeClick('customerNotes')}
                                                            onBlur={() => handleBlur('customerNotes')}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary-outline" onClick={onHide}>취소</Button>
                        <Button variant="secondary" onClick={handleSaveChanges}>저장</Button>
                    </Modal.Footer>
                </div>
            </form>
        </Modal>
    );
}

export default ViewDetailsModal;