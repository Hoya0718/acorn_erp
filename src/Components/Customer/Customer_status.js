import * as React from 'react'
import "../Main/Main.css"
import CustomerMain from './status/CustomerMain.js'

const Customer_status = ()=> {
    return (
        <div>
          <div className="Middle classification">
            <span> 회원 현황 </span>
          </div>
          <hr /> 
          <div>
            <section>
              <CustomerMain/>
            </section>
          </div>
        </div>
    );
}

export default Customer_status;