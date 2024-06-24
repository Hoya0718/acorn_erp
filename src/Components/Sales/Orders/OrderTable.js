import React from 'react'

const orders = [
  {
    orderNumber: '1001',
    productName: '단팥빵 ',
    customerName: '홍길동',
    contactNumber: '010-1234-5678',
    address: '서울시 강남구',
    unitPrice: 100000,
    quantity: 100,
    shippingFee: 5000,
    totalAmount: 105000,
    saleDate: '2023-06-15 10:30',
    notes: '',
    orderStatus: '결제 완료'
  },
];

const OrderTable = () => {
  return (
    <div>
      <h2>주문 정보</h2>
      <table>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품명</th>
            <th>이름</th>
            <th>연락처</th>
            <th>주소</th>
            <th>단가</th>
            <th>수량</th>
            <th>배송비</th>
            <th>판매금액</th>
            <th>판매일시</th>
            <th>요청사항</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderNumber}</td>
              <td>{order.productName}</td>
              <td>{order.customerName}</td>
              <td>{order.contactNumber}</td>
              <td>{order.address}</td>
              <td>{order.unitPrice.toLocaleString()} 원</td>
              <td>{order.quantity}</td>
              <td>{order.shippingFee.toLocaleString()} 원</td>
              <td>{order.totalAmount.toLocaleString()} 원</td>
              <td>{order.saleDate}</td>
              <td>{order.notes}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;