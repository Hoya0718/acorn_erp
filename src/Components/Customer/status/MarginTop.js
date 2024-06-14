import * as React from 'react'
import "../Main/Main.css"


const Customer_status = ()=> {
    return (
	<div>
		{/* <!-- 상품별 선호도 --> */}
		<div>
			{/* <!-- 상단 탭메뉴 --> */}
			<DIV style="margin-top: 10px">
			    <h3>상품별 고객 선호도</h3>
			    {/* <!--메뉴탭 --> */}
			    <div style="margin-top: 20px">
			    <ul class="nav nav-tabs">
			        <li class="nav-item">
			            <a class="nav-link ${empty param.prod || param.prod eq 'most' ? 'active' : ''}" aria-current="${empty param.prod || param.prod eq 'most' ? 'page' : ''}" href="/TeamProject/status.do?prod=most#section1" onclick="selectTab(this); sendRequest()">최다거래상품 TOP3</a>
			        </li>
			        <li class="nav-item">
			            <a class="nav-link ${param.prod eq 'top' ? 'active' : ''}" aria-current="${param.prod eq 'top' ? 'page' : ''}" href="/TeamProject/status.do?prod=top#section1" onclick="selectTab(this); sendRequest()">최고매출상품 TOP3</a>
			        </li>
			        <li class="nav-item">
			            <a class="nav-link ${param.prod eq 'favo' ? 'active' : ''}" aria-current="${param.prod eq 'favo' ? 'page' : ''}" href="/TeamProject/status.do?prod=favo#section1" onclick="selectTab(this); sendRequest()">인기상품 TOP3</a>
			        </li>
			    </ul>
			    </div>
			</DIV>

		</div>
		<div class="row">
			{/* <!-- top1,2,3 --> */}
			<c:forEach var="i" begin="1" end="3">
				<c:set var="prod" value="${param.prod}" />
				<c:set var="index" value="${i - 1}" />
				<div class="col-12 col-lg-4"style="margin-top: 10px">
					<div class="app-card app-card-chart h-100 shadow-sm" style="background-color: white" >
						<div class="app-card-header p-3 border-0" style="margin-bottom: -20px">
							<h4 class="app-card-title">TOP ${i}</h4>
						</div>
						<div class="app-card-body p-4">
						
							<c:choose>
								<c:when test="${prod eq 'most'}">
									<div class="section row">
										<div class="name col-7">
											<div class="prod_name"><h2> ${most[index].getM_prod()}</h2></div>
										</div>
										<div class="preference col-5">
											<div class="gender_preference centered-right-content"><h5> 	${most[index].getG_num() === "여성" ? '&#128105;&#127995;' : '&#128104;&#127995;'} ${most[index].getG_num()}</h5></div>
											<div class="age_preference centered-right-content"><h5> ${most[index].getA_num()}</h5></div>
											<div class="region_preference centered-right-content"><h5> ${most[index].getR_num()}</h5></div>
										</div>
									</div>
								</c:when>
								<c:when test="${prod eq 'top'}">
									<div class="section row">
										<div class="name col-7">
											<div class="prod_name"><h2> ${top[index].getT_prod()}</h2></div>
									</div>
										<div class="preference col-5">
											<div class="gender_preference centered-right-content"><h5> ${top[index].getG_price() === "여성" ? '&#128105;&#127995;' : '&#128104;&#127995;'}	${top[index].getG_price()}</h5></div>
									<div class="age_preference centered-right-content"><h5> ${top[index].getA_price()}</h5></div>
									<div class="region_preference centered-right-content"><h5> ${top[index].getR_price()}</h5></div>
									</div>
									</div>
								</c:when>
								<c:when test="${prod eq 'favo'}">
									<div class="section row">
										<div class="name col-7">
											<div class="prod_name"><h2>  ${favo[index].getF_prod()}</h2></div>
									</div>
										<div class="preference col-5">
											<div class="gender_preference centered-right-content"><h5> ${favo[index].getG_favo() === "여성" ? '&#128105;&#127995;' : '&#128104;&#127995;'}	${favo[index].getG_favo()}</h5></div>
											<div class="age_preference centered-right-content"><h5>${favo[index].getA_favo()}</h5></div>
											<div class="region_preference centered-right-content"><h5> ${favo[index].getR_favo()}</h5></div>
											</div>
											</div>
								</c:when>
								<c:otherwise>
									<c:if test="${empty param.prod}">
										<div class="section row">
										<div class="name col-7">
											<div class="prod_name"><h2>  ${most[index].getM_prod()}</h2></div>
										</div>
										<div class="preference col-5">
											<div class="gender_preference centered-right-content"><h5> ${most[index].getG_num() eq "여성" ? '&#128105;&#127995;' : '&#128104;&#127995;'}	${most[index].getG_num()}</h5></div>
											<div class="age_preference centered-right-content"><h5>${most[index].getA_num()}</h5></div>
											<div class="region_preference centered-right-content"><h5> ${most[index].getR_num()}</h5></div>
											</div>
											</div>
									</c:if>
								</c:otherwise>
							</c:choose>
							</div> 
						</div>				
					</div>	
							
			</c:forEach>
		</div>	
	</div>
)}


