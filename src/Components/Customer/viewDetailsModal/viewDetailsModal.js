// 작성자: 박승희
// 고객관리 세부사항보기 모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import { Modal, Button } from 'react-bootstrap';
import instance from './../../../api/axios';

const ViewDetailsModal = ({ show, onHide, data }) => {
    const [formData, setFormData] = React.useState(data);
    const [customerNotes, setCustomerNotes] = React.useState('');
    const [isEditMode, setIsEditMode] = React.useState(false);

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
        try {
            if (customerNotes) {
                await instance.post('/customer/saveNotes', {
                    customerId: formData.customerId,
                    notes: customerNotes
                });
            }
            onHide(); // 모달 닫기
        } catch (error) {
            console.error('Error saving changes:', error);
        }
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
                                        <input type="text" className="form-control" value={formData.customerName || ''} 
                                        style={{
                                            border: 'none',
                                            textAlign: 'center',
                                        }} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>성별</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={formData.customerGender || ''} style={{
                                            border: 'none',
                                            textAlign: 'center',
                                        }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>생년월일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" value={formatDateForInput(formData.customerBirthDate) || ''}
                                            style={{
                                                border: 'none',
                                                textAlign: 'lefted',
                                            }} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>연락처</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={formData.customerTel || ''} style={{
                                            border: 'none',
                                            textAlign: 'center',
                                        }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>주소</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" value={formData.customerAddr || ''} style={{
                                            border: 'none',
                                            textAlign: 'center',
                                        }} />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>가입일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" value={formatDateForInput(formData.registerDate) || ''}
                                            style={{
                                                border: 'none',
                                                textAlign: 'lefted',
                                            }} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>회원등급</label>
                                    </div>
                                    <div className="col-md-3">
                                        <select value={formData.customerGrade || ''}>
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
                                                            className="form-control"
                                                            value={note.notes}
                                                            style={{
                                                                border: 'none',
                                                                textAlign: 'lefted',
                                                            }}
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
                        <Button variant="secondary" onClick={handleSaveChanges}>확인</Button>
                    </Modal.Footer>
                </div>
            </form>
        </Modal>
    );
}

export default ViewDetailsModal;