// 작성자: 박승희
// 고객현황 세팅모달의 데이터 메뉴 세팅 페이지
import * as React from 'react'
import "../../Main/Main.css"
import "../Customer.css"
import {useCustomerStatus} from './CustomerStatusSettingContext';

const CustomerStatusSettingModal = () => {
    const { checkboxes_dist, setCheckboxes_dist, checkboxes_prod, setCheckboxes_prod, rangeValue, setRangeValue } = useCustomerStatus();
    
    const handleCheckboxChangeProd = (event) => {
        const { name, checked } = event.target;
        const selectedCount_prod = Object.values(checkboxes_prod).filter(value => value).length;
        
        if (selectedCount_prod === 1 && !checked) {
            alert("최소 한 개 이상 선택해야 합니다.");
            return;
        }
        setCheckboxes_prod(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const handleCheckboxChangeDist = (event) => {
        const { name, checked } = event.target;
        const selectedCount_dist = Object.values(checkboxes_dist).filter(value => value).length;
       
        if (selectedCount_dist === 1 && !checked) {
            alert("최소 한 개 이상 선택해야 합니다.");
            return;
        }
        setCheckboxes_dist(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };
    return (
        <div>
            <h4>보여질 메뉴 선택</h4>
            <h5><strong>고객분포도</strong></h5>
            <div>
                <label>
                    <input 
                        type='checkbox' 
                        name="gender" 
                        checked={checkboxes_dist.gender} 
                        onChange={handleCheckboxChangeDist}/> 성별
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input 
                        type='checkbox' 
                        name="age" 
                        checked={checkboxes_dist.age}  
                        onChange={handleCheckboxChangeDist}/> 연령별
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input 
                        type='checkbox' 
                        name="region" 
                        checked={checkboxes_dist.region} 
                        onChange={handleCheckboxChangeDist}/> 지역별
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <br/>
            <h5><strong>상품별 고객선호도</strong></h5>
            <div>
                <label>
                    <input 
                        type='checkbox' 
                        name="amount"
                        checked={checkboxes_prod.amount} 
                        onChange={handleCheckboxChangeProd} /> 최고매출상품
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input 
                        type='checkbox' 
                        name="count" 
                        checked={checkboxes_prod.count} 
                        onChange={handleCheckboxChangeProd}/> 최다거래상품
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    <input 
                        type='checkbox' 
                        name="reaction"
                        checked={checkboxes_prod.reaction} 
                        onChange={handleCheckboxChangeProd}
                        /> 반응좋은상품
                </label>
            </div>
            <br/>
            <div>
                <div className='row'>
                    <div className='col'>
                        <h5><strong>고객랭킹</strong></h5>
                    </div>
                    <div className='col'>
                    <h5>{rangeValue}위 까지 보입니다.</h5>
                    </div>
                </div>
                <input type="range" className="form-range" min="5" max="20" id="customRange2"
                    value={rangeValue}
                    onChange={handleRangeChange} />
                <hr></hr>
            </div>
        </div>

    );
}

export default CustomerStatusSettingModal;