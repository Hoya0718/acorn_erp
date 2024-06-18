// 작성자: 박승희
// 고객현황 데이터 시각화 "상품별 고객선호도" 컴포넌트
import * as React from 'react'
import "../../Main/Main.css"

// 테스트를 위한 데이터 세팅: 동적 데이터 변경해야함
const TopProd = () => {
    const [prod, setProd] = React.useState('most'); // 기본값을 'most'로 설정
    const most = [
        { prod: '고구마식빵', gender: '여성', ageGroup: '20대', region: '서울' },
        { prod: '소금빵', gender: '남성', ageGroup: '30대', region: '부산' },
        { prod: '소세지빵', gender: '여성', ageGroup: '40대', region: '대구' }
    ];
    const top = [
        { prod: 'Product D', gender: '여성', ageGroup: '20대',region: '경기' },
        { prod: 'Product E', gender: '여성', ageGroup: '30대', region: '대전' },
        { prod: 'Product F', gender: '여성', ageGroup: '40대', region: '포천' }
    ];
    const favo = [
        { prod: 'Product G', gender: '남성', ageGroup: '20대', region: '양주' },
        { prod: 'Product H', gender: '남성', ageGroup: '30대', region: '일동' },
        { prod: 'Product I', gender: '남성', ageGroup: '40대', region: '수원' }
    ];

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
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={`nav-link ${prod === 'most' ? 'active' : ''}`} 
                                onClick={() => handleTabClick('most')}>
                                    최다거래상품 TOP3</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${prod === 'top' ? 'active' : ''}`} 
                                onClick={() => handleTabClick('top')}>
                                    최고매출상품 TOP3</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${prod === 'favo' ? 'active' : ''}`} 
                                onClick={() => handleTabClick('favo')}>
                                    인기상품 TOP3</button>
                            </li>
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

