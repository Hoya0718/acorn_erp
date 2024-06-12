import * as React from 'react'
import "../Main/Main.css"
import Dist from "./status/Dist.js"
import Goal from './status/Goal.js'
import CustomerMain from './status/CustomerMain.js'
import Rank from './status/Rank.js'
import CustomerTable from './status/CustomerTable.js'

const Customer_status = ()=> {
    return (
        <div>
          <div className="Middle classification">
            <span> 회원 현황 </span>
          </div>
          <hr /> 
          <div>
            <section>
              <CustomerMain></CustomerMain>

            </section>
          </div>
        </div>
    );
}

export default Customer_status;