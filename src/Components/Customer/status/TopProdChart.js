// 작성자: 박승희
// 고객현황 데이터 시각화 "상품별 고객선호도" 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"
import instance from './../../../api/axios';

// 테스트를 위한 데이터 세팅: 동적 데이터 변경해야함
const TopProd = () => {
    const [chartNames, setChartNames] = React.useState([]);
    const [prod, setProd] = React.useState('most'); // 기본값을 'most'로 설정
    const [most, setMost] = React.useState([]);
    const [top, setTop] = React.useState([]);
    const [favo, setFavo] = React.useState([]);
    
    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        const fetchTableData = async () => {
            try {
                const response_Amount = await instance.get('/customer/getTop3ByTotalAmount');
                const data_Amount = response_Amount.data;
                console.log("getTop3ByTotalAmount Data: ", data_Amount);
                const response_Count = await instance.get('/customer/getTop3ByTotalCount');
                const data_Count = response_Count.data;
                console.log("ggetTop3ByTotalCount Data: ", data_Count);
                //const response_Rating = await instance.get('/customer/getTop3ByRating');
                //const data_Rating = response_Rating.data;

        if (savedSettings) {
            const { checkboxes_prod } = JSON.parse(savedSettings);
            const mostData = data_Amount.map(item => ({
                prod: item.itemName,
                gender: item.genderPreference,
                ageGroup: item.agePreference,
                region: item.regionPreference,
            }));
            const topData = data_Count.map(item => ({
                prod: item.itemName,
                gender: item.genderPreference,
                ageGroup: item.agePreference,
                region: item.regionPreference,
            }));
            // const favoData = data_Rating.map(item => ({
            //     prod: item.itemName,
            //     gender: item.genderPreference,
            //     ageGroup: item.agePreference,
            //     region: item.regionPreference,
            // }));

            setMost(mostData);
            setTop(topData);
            // setFavo(favoData);
            
            const charts = [];
            if (checkboxes_prod.amount) {
                charts.push('most');
            }
            if (checkboxes_prod.count) {
                charts.push('top');
            }
            // if (checkboxes_prod.reaction) {
            //     charts.push('favo');
            // }
            setChartNames(charts);
        }
        } catch (error) {
            console.error('Error get TableData_dist:', error);
        }
    }
    fetchTableData();
}, []);

    const renderProducts = (products) => {
        return products.map((product, index) => (
            <div className="col-12 col-lg-4" style={{ marginTop: '10px' }} key={index}>
                <div className="app-card app-card-chart h-100 shadow-sm" style={{ backgroundColor: 'white' }}>
                    <div className="app-card-header p-3 border-0" style={{ marginBottom: '-20px' }}>
                        <h4 className="app-card-title">TOP {index + 1}</h4>
                    </div>
                    <div className="app-card-body p-4">
                        <div className="section row">
                            {/* 상품명 */}
                            <div className="name col-7">
                                <div className="prod_name"><h2>{product.prod}</h2></div>
                            </div>
                            <div className="preference col-5">
                                {/* 선호 성별, 연령, 지역 */}
                                <div className="gender_preference righted"><h5>{product.gender === "여성" ? '👩' : '👨'} {product.g_num}</h5></div>
                                <div className="age_preference righted"><h5>{product.ageGroup}</h5></div>
                                <div className="region_preference righted"><h5>{product.region}</h5></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const handleTabClick = (newProd) => {
        setProd(newProd);
    };

    let currentProducts = [];
    if (prod === 'most') {
        currentProducts = most;
    } else if (prod === 'top') {
        currentProducts = top;
    } else if (prod === 'favo') {
        currentProducts = favo;
    }

    return (
        <div>
            <div>
                <div style={{ marginTop: '10px' }}>
                    <h3>상품별 고객 선호도</h3>
                    <div style={{ marginTop: '20px' }}>
                        <ul className="nav nav-tabs "  style={{border: "none"}}>
                        {chartNames.includes('most') && (
                                <li className="nav-item">
                                    <button className={`nav-link ${prod === 'most' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('most')}>
                                        최다거래상품 TOP3</button>
                                </li>
                            )}
                            {chartNames.includes('top') && (
                                <li className="nav-item">
                                    <button className={`nav-link ${prod === 'top' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('top')}>
                                        최고매출상품 TOP3</button>
                                </li>
                            )}
                            {chartNames.includes('favo') && (
                                <li className="nav-item">
                                    <button className={`nav-link ${prod === 'favo' ? 'active' : ''}`} 
                                    onClick={() => handleTabClick('favo')}>
                                        인기상품 TOP3</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                {renderProducts(currentProducts)}
            </div>
        </div>
    );
};

export default TopProd;

