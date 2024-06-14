import * as React from 'react'
import "../../Main/Main.css"

const Dist = () => {
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
                                    <canvas id="gender_Chart"></canvas>
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
                                    <canvas id="age_Chart"></canvas>
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
                                    <canvas id="region_Chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
}

export default Dist;