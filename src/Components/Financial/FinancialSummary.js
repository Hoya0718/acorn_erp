import React, { useState, useEffect } from 'react';
import './Financial.css';

const FinancialSummary = ({ data }) => {
    const [summaryType, setSummaryType] = useState('year');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 현재 연도를 기본 선택값으로 설정
    const [selectedQuarter, setSelectedQuarter] = useState(1); // 분기 선택
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 현재 월을 기본 선택값으로 설정
    const [monthData, setMonthData] = useState([]); // 월별 데이터를 저장
    const [yearData, setYearData] = useState([]); // 연도별 데이터를 저장
    const [quarterData, setQuarterData] = useState([]); // 분기별 데이터를 저장할 

    // 월 선택 옵션 생성
    const monthOptions = Array.from({ length: 12 }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}월`
    }));

    // 분기 선택 옵션 생성
    const quarterOptions = Array.from({ length: 4 }, (_, index) => ({
        value: index + 1,
        label: `Q${index + 1}`
    }));

    // 연도 변경 시 데이터 업데이트
    useEffect(() => {
        setYearData(summarizeByYear(data));
    }, [data]);

    // 분기 변경 시 데이터 업데이트
    useEffect(() => {
        setQuarterData(summarizeByQuarter(data));
    }, [data]);

    // 월 변경 시 데이터 업데이트
    useEffect(() => {
        setMonthData(summarizeByMonth(data));
    }, [data]);

    const summarizeByMonth = (data) => {
        const summarized = data.reduce((acc, item) => {
            const month = new Date(item.orderDate).getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
            const year = new Date(item.orderDate).getFullYear();
            const key = `${year}-${month}`;
            if (!acc[key]) {
                acc[key] = {
                    year,
                    month,
                    totalSales: 0 // 초기값을 0으로 설정
                };
            }
            acc[key].totalSales += item.orderTotalPrice; // 해당 월의 총 매출에 추가
            return acc;
        }, {});

        // Object를 배열로 변환하여 정렬
        const summarizedArray = Object.values(summarized).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });

        return summarizedArray;
    };

    const summarizeByQuarter = (data) => {
        const summarized = data.reduce((acc, item) => {
            const quarter = Math.ceil((new Date(item.orderDate).getMonth() + 1) / 3); // 분기 계산
            const year = new Date(item.orderDate).getFullYear();
            const key = `${year}-Q${quarter}`;
            if (!acc[key]) {
                acc[key] = {
                    year,
                    quarter,
                    totalSales: 0 // 초기값을 0으로 설정
                };
            }
            acc[key].totalSales += item.orderTotalPrice; // 해당 분기의 총 매출에 추가
            return acc;
        }, {});

        // Object를 배열로 변환하여 정렬
        const summarizedArray = Object.values(summarized).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.quarter - b.quarter;
        });

        return summarizedArray;
    };

    const summarizeByYear = (data) => {
        const summarized = data.reduce((acc, item) => {
            const year = new Date(item.orderDate).getFullYear();
            const key = `${year}`;
            if (!acc[key]) {
                acc[key] = {
                    year,
                    totalSales: 0 // 초기값을 0으로 설정
                };
            }
            acc[key].totalSales += item.orderTotalPrice; // 해당 연도의 총 매출에 추가
            return acc;
        }, {});

        // Object를 배열로 변환하여 정렬
        const summarizedArray = Object.values(summarized).sort((a, b) => a.year - b.year);

        return summarizedArray;
    };

    const getSummaryData = () => {
        switch (summaryType) {
            case 'month':
                return monthData.filter(item => item.year === selectedYear && item.month <= selectedMonth);
            case 'quarter':
                return quarterData.filter(item => item.year === selectedYear && item.quarter <= selectedQuarter);
            case 'year':
            default:
                return yearData.filter(item => item.year === selectedYear);
        }
    };

    const summarizedData = getSummaryData();

    return (
        <div>
            <div className="summary-type">
                <select
                    value={summaryType}
                    onChange={(e) => {
                        setSummaryType(e.target.value);
                        if (e.target.value === 'year') {
                            setSelectedYear(new Date().getFullYear()); // 기본적으로 현재 연도로 선택
                        } else if (e.target.value === 'quarter') {
                            setSelectedQuarter(1); // 기본적으로 1분기로 선택
                        } else if (e.target.value === 'month') {
                            setSelectedMonth(new Date().getMonth() + 1); // 기본적으로 현재 월로 선택
                        }
                    }}
                >
                    <option value="year">연도별</option>
                    <option value="quarter">분기별</option>
                    <option value="month">월별</option>
                </select>

                {summaryType === 'month' && (
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                        {monthOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}

                {summaryType === 'quarter' && (
                    <select
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(parseInt(e.target.value))}
                    >
                        {quarterOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <section>
                <table className="table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summarizedData.length > 0 ? (
                            summarizedData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {summaryType === 'year'
                                            ? item.year
                                            : summaryType === 'quarter'
                                            ? `Q${item.quarter}, ${item.year}`
                                            : `${item.year}-${item.month}`}
                                    </td>
                                    <td>{item.totalSales.toLocaleString()} 원</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default FinancialSummary;
