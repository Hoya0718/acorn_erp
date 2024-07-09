import axios from '../../api/axios';

// 아이템 데이터 가져오기
export const fetchItems = async () => {
    try {
        console.log('Fetching items...');
        const response = await axios.get('/items');
        console.log("Item 데이터 호출 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
};

// 주문 데이터 가져오기
export const fetchOrders = async () => {
    try {
        console.log('Fetching orders...');
        const response = await axios.get('/orders');
        console.log("Order 데이터 호출 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

// combinedData 조합하기
export const combineData = (orders, items) => {
    if (orders.length === 0 || items.length === 0) return [];

    const combined = orders.map(order => {
        const item = items.find(item => item.itemName === order.itemName);
        return {
            itemCode: item ? item.itemCode : '',
            itemType: item ? item.itemType : '',
            itemName: order.itemName,
            orderDate: order.orderDate,
            orderStatus: order.orderStatus,
            orderPrice: order.orderPrice,
            orderTotalPrice: order.orderTotalPrice,
            itemQty: order.itemQty
        };
    });

    return combined;
};

// 총매출 계산하기
export const calculateTotalSales = (combinedData) => {
    return combinedData.reduce((acc, data) => acc + data.orderTotalPrice, 0);
};

// 데이터 필터링하기
export const filterData = (searchTerm, combinedData) => {
    let filteredBySearch = combinedData;

    if (searchTerm.trim() !== '') {
        const regex = new RegExp(searchTerm, 'i');
        filteredBySearch = combinedData.filter(data =>
            regex.test(data.itemName) ||
            (typeof data.itemCode === 'string' && data.itemCode.includes(searchTerm)) ||
            (typeof data.itemCode === 'number' && data.itemCode.toString().includes(searchTerm))
        );
    }

    return filteredBySearch;
};
