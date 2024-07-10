// import * as React from 'react'
// import "../../Main/Main.css"
// import "./materials.css"
// import Pagination from '../../Customer/modules/PaginationModule';
// import instance from './../../../api/axios';

// const Materials= ()=> {
  
//     return (
//         <div>
    
//           <div className="Middle classification">
//             <span> <h2>자재관리</h2> </span>
//           </div>
    
//           <hr />
    
//           <div className="top-buttons"> 
//             <span><button>등록</button></span>
//             <span><button>수정</button></span>
//             <span><button>삭제</button></span>
//           </div>
    
//           <br />
          
//           <div className="searcher">
            
//             <div className="left">
//               <div className="middle-buttons">
//               <label for="date">
//                 <input type="date" id="date" max="2077-06-20" min="2077-06-05" value="2024-07-18" />
//               </label>
//                   <label>
//                         <select>
//                             <option value="">자재코드</option>
//                             <option value="">품목명선택</option>
//                         </select>
//                   </label>
//               </div>
//             </div>
//             <div className="right">
//               <div className="middle-buttons">
//               <input type="text" placeholder='🔍︎검색' /><button>조회</button>
//               </div>
//               </div>

    
//           </div>
    
//           <div>
//             <section>
//             <table className='materials-table'>
//                         <thead>
//                             <tr>
//                                 <th><input type="checkbox"/></th>
//                                 <th>품목코드</th>
//                                 <th>품목이름</th>
//                                 <th>수량</th>
//                                 <th>특이사항</th>
//                                 <th>등록일</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td><input type="checkbox"/></td>
//                                 <td>12345</td>
//                                 <td>케이크</td>
//                                 <td>1</td>
//                                 <td>없음</td>
//                                 <td>2024.01.01</td>
//                             </tr>
//                             <tr>
//                                 <td><input type="checkbox"/></td>
//                                 <td>12345</td>
//                                 <td>케이크</td>
//                                 <td>1</td>
//                                 <td>없음</td>
//                                 <td>2024.01.01</td>
//                             </tr>
//                             <tr>
//                                 <td><input type="checkbox"/></td>
//                                 <td>12345</td>
//                                 <td>케이크</td>
//                                 <td>1</td>
//                                 <td>없음</td>
//                                 <td>2024.01.01</td>
//                             </tr>
//                             <tr>
//                                 <td><input type="checkbox"/></td>
//                                 <td>12345</td>
//                                 <td>케이크</td>
//                                 <td>1</td>
//                                 <td>없음</td>
//                                 <td>2024.01.01</td>
//                             </tr>
//                         </tbody>
//                     </table>
//             </section>
//             <div className="bottom-buttons"> 
//             <span><button>엑셀다운</button></span>
//             <span><button>인쇄</button></span>
//           </div>
//           </div>
//         </div>
//     );
// }

// export default Materials;