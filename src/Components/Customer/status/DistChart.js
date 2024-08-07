import * as React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../../Main/Main.css"
import "../Customer.css"
import instance from '../../../api/axios';
import { useCustomerStatus } from '../settingModal/CustomerStatusSettingContext';
// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Dist = () => {
    const {
        selectedRegion, setSelectedRegion,
        selectedProvince, setSelectedProvince,
        selectedCity, setSelectedCity,
    } = useCustomerStatus();
    const [chartNames, setChartNames,
        lowestAdmCodeNames, setLowestAdmCodeNames
    ] = React.useState([]);
    const [chartData, setChartData] = React.useState({
        ageGroupData: null,
        genderGroupData: null,
        regionGroupData: null
    });

    const [regionChartLabels, setRegionChartLabels] = React.useState([]);
    const [regionChartData, setRegionChartData] = React.useState({});

    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');
        const fetchGroupData = async () => {
            try {
                const response_age = await instance.get('/customer/count_age_group');
                const data_age = response_age.data;

                const ageChartLabels = Object.keys(data_age);
                const ageChartValues = Object.values(data_age);

                const ageGroupData = {
                    labels: ageChartLabels,
                    datasets: [{
                        data: ageChartValues,
                        backgroundColor: generatePastelColors(ageChartLabels.length),
                    }]
                };

                const response_gender = await instance.get('/customer/count_gender_group');
                const data_gender = response_gender.data;
                const genderChartLabels = Object.keys(data_gender);
                const genderChartValues = Object.values(data_gender);

                const genderGroupData = {
                    labels: genderChartLabels,
                    datasets: [{
                        data: genderChartValues,
                        backgroundColor: generatePastelColors(genderChartLabels.length),
                    }]
                };

                const response_region = await instance.get('/customer/count_region_group');
                const data_region = response_region.data;
                let labels = [];
                let values = [];
                if (selectedRegion === "전국") {
                    labels = Object.keys(data_region.Province);
                    values = Object.values(data_region.Province);
                }
                if (selectedRegion === "시도") {
                    labels = Object.keys(data_region.City);
                    values = Object.values(data_region.City);
                }
                if (selectedRegion === "시군구") {
                    labels = Object.keys(data_region.Town);
                    values = Object.values(data_region.Town);
                    console.log('data_region', labels);
                }
                setRegionChartLabels(labels);

                const regionColors = generatePastelColors(values.length);

                setRegionChartData({
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: regionColors,
                    }]
                });

                setChartData({
                    ageGroupData, genderGroupData, regionGroupData: {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: generatePastelColors(labels.length),
                        }]
                    }
                });

                if (savedSettings) {
                    const { checkboxes_dist } = JSON.parse(savedSettings);

                    const charts = [];
                    if (checkboxes_dist.gender && chartData.genderGroupData) {
                        charts.push({ data: chartData.genderGroupData, label: '성별' });
                    }
                    if (checkboxes_dist.age && chartData.ageGroupData) {
                        charts.push({ data: chartData.ageGroupData, label: '연령별' });
                    }
                    if (checkboxes_dist.region) {
                        const backgroundColors = generatePastelColors(labels.length);
                        charts.push({
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: values,
                                    backgroundColor: backgroundColors,
                                }]
                            }, label: '지역별'
                        });
                    }
                    setChartNames(charts);
                }
            } catch (error) {
                console.error('Error setChartNames:', error);
            }
        };

        fetchGroupData();
    }, [selectedRegion]);

    const findMaxLabel = (data) => {
        const maxIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
        return data.labels[maxIndex];
    };

    const generatePastelColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor(Math.random() * 360);
            const pastelColor = `hsl(${hue}, 50%, 75%)`;
            colors.push(pastelColor);
        }
        return colors;
    };

    // 두 번째 useEffect: chartData가 업데이트된 후 chartNames 설정
    React.useEffect(() => {
        const savedSettings = localStorage.getItem('customerStatusSettings');

        if (savedSettings) {
            const { checkboxes_dist } = JSON.parse(savedSettings);

            const charts = [];
            if (checkboxes_dist.gender && chartData.genderGroupData) {
                charts.push({ data: chartData.genderGroupData, label: '성별' });
            }
            if (checkboxes_dist.age && chartData.ageGroupData) {
                charts.push({ data: chartData.ageGroupData, label: '연령별' });
            }
            if (checkboxes_dist.region && chartData.regionGroupData) {
                charts.push({ data: chartData.regionGroupData, label: '지역별' });
            }
            setChartNames(charts);
        }
    }, [chartData]);

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
    const createOptions = (data) => ({
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            centerText: {
                text: findMaxLabel(data),
                color: 'gray',
                fontSize: 30,
            }
        }
    });

    return (
        <div className="c_dist" >
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
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-header p-3 border-0">
                                        <h4 className="app-card-title" style={{ marginBottom: '-15px' }}>{chart.label}</h4>
                                    </div>
                                    <div className="app-card-body p-3 p-lg-4 centered-content" >
                                        <Doughnut data={chart.data} options={createOptions(chart.data)} plugins={[centerTextPlugin]} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>우측 상단에 설정을 확인해주세요!</div>
                    )}
                </div>
            </section>
        </div>
    );

}

export default Dist;
