// 작성자: 박승희
// 고객현황 데이터 시각화 "고객분포도" 컴포넌트

import * as React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../../Main/Main.css"
import "../Customer.css"
// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Dist = () => {
    const [chartNames, setChartNames] = React.useState([]);

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        
        if (savedSettings) {
            const { checkboxes_dist } = JSON.parse(savedSettings);
            //예제데이터
            const genderData = {
                labels: ['남성', '여성'],
                datasets: [{
                    data: [60, 40],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                }]
            };
            const ageData = {
                labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
                datasets: [{
                    data: [10, 20, 30, 15, 15, 10],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                }]
            };
            // 지역 분류 수정 필요: 설정 모달창 변수랑 연결
            const regionData = {
                labels: ['서울', '경기', '인천', '부산', '대구', '기타'],
                datasets: [{
                    data: [30, 25, 15, 10, 10, 10],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                }]
            };

            const charts = [];
            if (checkboxes_dist.gender) {
                charts.push({ data: genderData, label: '성별' });
            }
            if (checkboxes_dist.age) {
                charts.push({ data: ageData, label: '연령별' });
            }
            if (checkboxes_dist.region) {
                charts.push({ data: regionData, label: '지역별' });
            }

            setChartNames(charts);
        }
    }, []);
    //1등라벨 찾기 함수

    //도넛차트 안쪽 텍스트 설정
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            ctx.save();
            const text = chart.config.options.plugins.centerText.text;
            const color = chart.config.options.plugins.centerText.color || 'gray';
            const fontSize = chart.config.options.plugins.centerText.fontSize || 30;
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = color;
            const textX = Math.round(width / 2);
            const textY = Math.round(height / 2);
            ctx.fillText(text, textX, textY);
            ctx.restore();
        }
    };
    const createOptions = (label) => ({
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            centerText: {
                text: label,
                color: 'gray',
                fontSize: 30,
            }
        }
    });

    return (
        <div className="c_dist">
            <section>
                <div className="row title">
                    <div className="col-10">
                        <h3>고객 분포도</h3>
                    </div>
                </div>
                <div className="row content">
                    {chartNames.length > 0 ? (
                        chartNames.map((chart, index) => (
                            <div key={index} className="col-lg-4 col-md-6  col-sm-12 chart1" >
                                <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: 'white' }}>
                                    <div className="app-card-header p-3 border-0">
                                        <h4 className="app-card-title" style={{ marginBottom: '-15px' }}>{chart.label}</h4>
                                    </div>
                                    <div className="app-card-body p-3 p-lg-4 centered-content" >
                                        <Doughnut data={chart.data} options={createOptions(chart.label)} plugins={[centerTextPlugin]} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>데이터를 불러오는 중입니다...</div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Dist;