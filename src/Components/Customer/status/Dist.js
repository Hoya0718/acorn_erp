import * as React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../../Main/Main.css"
import "../Customer.css"

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Dist = () => {
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
    const regionData = {
        labels: ['서울', '경기', '인천', '부산', '대구', '기타'],
        datasets: [{
            data: [30, 25, 15, 10, 10, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
    };
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            ctx.save();
            const text = chart.config.options.plugins.centerText.text;
            const color = chart.config.options.plugins.centerText.color || 'gray';
            const fontSize = chart.config.options.plugins.centerText.fontSize || 40;
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
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            centerText: {
                text: label,
                color: 'gray',
                fontSize: 40,

            }
        }
    });

    return (
        <div className="c_dist">
                <section>
                    {/*<!-- 고객분포도 -->*/}
                    <div className="row title">
                        <div className="col-10">
                            <h3>고객 분포도</h3>
                        </div>
                    </div>
                    <div className="row content">
                        {/* <!-- 성별 고객분포도 --> */}
                        <div className="col-lg-4 col-md-6  col-sm-12 chart1" >
                            <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor : 'white'}}>
                                <div className="app-card-header p-3 border-0">
                                    <h4 className="app-card-title" style={{marginBottom: '-15px'}}>성별</h4>
                                </div>
                                <div className="app-card-body p-3 p-lg-4 centered-content" >
                                    <Doughnut data={genderData}  options={createOptions(genderData.labels[0])} plugins={[centerTextPlugin]}/>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 연령별 고객분포도 --> */}
                        <div className="col-lg-4 col-md-6 d-none d-md-block chart2" >
                            <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor : 'white'}}>
                                <div className="app-card-header p-3 border-0">
                                    <h4 className="app-card-title" style={{marginBottom: '-15px'}}>연령별</h4>
                                </div>
                                <div className="app-card-body p-3 p-lg-4 centered-content" >
                                    <Doughnut data={ageData}  options={createOptions(ageData.labels[0])} plugins={[centerTextPlugin]}  />
                                </div>
                            </div>
                        </div>
                        {/* <!-- 지역별 고객분포도 --> */}
                        <div className="col-lg-4 d-none d-lg-block chart3" >
                            <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor : 'white'}}>
                                <div className="app-card-header p-3 border-0">
                                    <h4 className="app-card-title" style={{marginBottom: '-15px'}}>지역별</h4>
                                </div>
                                <div className="app-card-body p-3 p-lg-4 centered-content" >
                                    <Doughnut data={regionData}  options={createOptions(regionData.labels[0])} plugins={[centerTextPlugin]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
}

export default Dist;