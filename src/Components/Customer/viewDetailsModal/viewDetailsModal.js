// 작성자: 박승희
// 고객관리 세부사항보기 모달 페이지
import * as React from 'react';
import "../../Main/Main.css";
import { Modal, Button } from 'react-bootstrap';
import instance from './../../../api/axios';

const ViewDetailsModal = ({ show, onHide, data }) => {
    const [formData, setFormData] = React.useState(data);
    const [ageGroup, setAgeGroup] = React.useState('');
    const [regionGroupProvince, setRegionGroupProvince] = React.useState('');
    const [regionGroupCity, setRegionGroupCity] = React.useState('');
    const [regionGroupTown, setRegionGroupTown] = React.useState('');
    const [customerNotes, setCustomerNotes] = React.useState('');

    React.useEffect(() => {
        const fetchTableData = async () => {
            try {
                //연령그룹 데이터 호출
                const response_ageGroup = await instance.get('/customer/get_age_group');
                const data_ageGroup = response_ageGroup.data
                const ageGroupInfo = data_ageGroup.find(info => info.customerId === data.customerId);
                setAgeGroup(ageGroupInfo ? ageGroupInfo.ageGroup : '');

                const response_regionGroup = await instance.get('/customer/get_region_group');
                const data_regionGroup = response_regionGroup.data;
                const regionGroupInfo = data_regionGroup.find(info => info.customerId === data.customerId);
                setRegionGroupProvince(regionGroupInfo ? regionGroupInfo.regiongroupProvince : '');
                setRegionGroupCity(regionGroupInfo ? regionGroupInfo.regiongroupCity : '');
                setRegionGroupTown(regionGroupInfo ? regionGroupInfo.regiongroupTown : '');

            } catch (error) {
                console.error('Error get MgmtTable:', error);
            }
        }
        fetchTableData();
    }, []);

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
            await instance.post('/customer/saveNotes', {
                customerId: formData.customerId,
                notes: customerNotes
            });
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
                                        <input type="text" className="form-control" value={formData.customerName || ''} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>성별</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={formData.customerGender || ''} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>생년월일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" value={formatDateForInput(formData.customerBirthDate) || ''} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>연락처</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={formData.customerTel || ''} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>주소</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" value={formData.customerAddr || ''} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>연령그룹</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={ageGroup || ''} />
                                    </div>
                                    <div className="col-md-3 centered">
                                        <label>지역그룹</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={regionGroupProvince || ''} />
                                        <input type="text" className="form-control" value={regionGroupCity || ''} />
                                        <input type="text" className="form-control" value={regionGroupTown || ''} />
                                        
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-3 centered">
                                        <label>가입일</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" value={formatDateForInput(formData.registerDate) || ''} />
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
                                        <input type="text" className="form-control" value={formData.customerNotes || ''} />
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