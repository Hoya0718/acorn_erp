// 작성자: 박승희
// 고객관리 세부사항보기 모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import { Modal, Button } from 'react-bootstrap';

const ViewDetailsModal = (show, onHide, data) => {

    const handleSettingClick = () => {
    };
    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <div className="modal-content">
                    <Modal.Header closeButton>
                        <Modal.Title>고객 세부현황 보기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>이름</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>생년월일</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>성별</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>연락처</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>연령그룹</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>지역그룹</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>가입일</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>회원등급</label>
                                    </div>
                                    <div className="col-md-6">
                                        <select>
                                            <option>우수</option>
                                            <option>일반</option>
                                            <option>주의</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group">
                                <label>특이사항</label>
                                <input type="text" className="form-control" />
                                <input type="text" className="form-control" />
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>확인</Button>
                    </Modal.Footer>
                </div>
            </form>
        </Modal>
    );
}

export default ViewDetailsModal;