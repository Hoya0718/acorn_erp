import axios from '../../../api/axios';
import DatePicker from 'react-datepicker';

// 발주 목록을 가져오는 함수
export const fetchPurchases = async (setPurchases) => {
  try {
    const response = await axios.get('/purchase/list');
    if (response.status === 200) {
      setPurchases(response.data); // 서버에서 정상적으로 데이터를 가져온 경우
      console.log('발주 목록을 가져왔습니다.', response.data);
    } else {
      console.error('발주 목록을 가져오는 중 서버 응답 오류:', response.status);
    }
  } catch (error) {
    console.error('발주 목록을 가져오는 중 에러 발생:', error);
  }
};

// 발주 추가 버튼 클릭 시 처리하는 함수
export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

// 발주 수정 버튼 클릭 시 처리하는 함수
export const handleUpdateClick = (selectedPurchases, purchases, setUpdatePurchase, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedPurchases.length !== 1) {
    alert('수정할 발주 품목을 하나만 선택해 주세요.');
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 발주 품목의 정보를 updatePurchase에 설정
  const selectedPurchase = purchases.find(
    (purchase) => purchase.id === selectedPurchases[0]
  );
  setUpdatePurchase(selectedPurchase);
};

// 발주 삭제 버튼 클릭 시 처리하는 함수
export const handleDeleteClick = async (selectedPurchases, purchases, setPurchases, setSelectedPurchases) => {
  if (selectedPurchases.length === 0) {
    alert('삭제할 발주 품목을 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedPurchases.map(async (purchaseId) => {
          await axios.delete(`/purchase/${purchaseId}`);
        })
      );
      const updatedPurchases = purchases.filter(
        (purchase) => !selectedPurchases.includes(purchase.id)
      );
      setPurchases(updatedPurchases);
      setSelectedPurchases([]);
    } catch (error) {
      console.error('발주 삭제 중 에러 발생:', error);
    }
  }
};

// 발주 추가 폼 제출 시 처리하는 함수
export const handleSubmitAdd = async (e, newPurchase, purchases, setPurchases, setIsAddClicked, setNewPurchase, setSelectedPurchases) => {
  e.preventDefault();
  try {
    console.log('추가 함수 실행');
    console.log('handleSubmitAdd - newPurchase:', newPurchase);
    console.log('handleSubmitAdd - purchases:', purchases);
    const response = await axios.post('/purchase/add', newPurchase);
    
    // 서버 응답 데이터 확인
    if (!response.data) {
      console.error('서버 응답에 데이터가 없습니다.');
      // 서버 응답에 데이터가 없는 경우 처리 로직 추가
      // 예: 사용자에게 경고 메시지를 표시하거나, 적절한 에러 처리를 수행
      return;
    }

    console.log('서버 응답:', response.data); // 서버 응답 확인용 로그
    // 새로 추가된 발주를 purchases 배열 앞에 추가하고
    // 다시 발주 목록을 가져와서 화면에 표시한다.
    const updatedPurchases = [response.data, ...purchases];
    setPurchases(updatedPurchases);
    setIsAddClicked(false);
    setNewPurchase({
      purchaseCode: '',
      purchaseName: '',
      purchaseUnit: '',
      orderDate: '',
      orderQty: 0,
      price: 0,
      remark: '',
    });
    setSelectedPurchases([]);
  } catch (error) {
    console.error('발주 추가 중 에러 발생:', error);
    // axios.post 요청에서 발생한 에러 처리
    // 예: 사용자에게 경고 메시지를 표시하거나, 적절한 에러 처리를 수행
  }
};

// handleSubmitUpdate 함수 수정
export const handleSubmitUpdate = async (e, updatePurchase, purchases, setPurchases, setIsUpdateClicked, setUpdatePurchase) => {
  e.preventDefault();
  try {
    await axios.put(`/purchase/${updatePurchase.id}`, updatePurchase);
    const updatedPurchases = purchases.map((purchase) =>
      purchase.id === updatePurchase.id ? updatePurchase : purchase
    );
    setPurchases(updatedPurchases);
    setIsUpdateClicked(false);
    setUpdatePurchase(null);
  } catch (error) {
    console.error('발주 수정 중 에러 발생:', error);
  }
};


// 체크박스 변경 시 처리하는 함수
export const handleCheckboxChange = (purchaseId, selectedPurchases, setSelectedPurchases) => {
  if (selectedPurchases.includes(purchaseId)) {
    setSelectedPurchases(selectedPurchases.filter((id) => id !== purchaseId));
  } else {
    setSelectedPurchases([...selectedPurchases, purchaseId]);
  }
};

// 전체 선택/해제 처리하는 함수
export const handleSelectAll = (selectAll, purchases, setSelectedPurchases, setSelectAll) => {
  if (!selectAll) {
    const allPurchaseIds = purchases.map((purchase) => purchase.id);
    setSelectedPurchases(allPurchaseIds);
  } else {
    setSelectedPurchases([]);
  }
  setSelectAll(!selectAll);
};

// 새로운 발주 정보 입력 시 필드 변경 처리하는 함수
export const handleChangeNewPurchase = (field, value, newPurchase, setNewPurchase) => {
  setNewPurchase({ ...newPurchase, [field]: value });
};

// 수정 중인 발주 정보 입력 시 필드 변경 처리하는 함수
export const handleChangeUpdatePurchase = (field, value, updatePurchase, setUpdatePurchase) => {
  setUpdatePurchase({ ...updatePurchase, [field]: value });
};

// 발주 추가 취소 시 처리하는 함수
export const handleCancelAdd = (setIsAddClicked, setNewPurchase) => {
  setIsAddClicked(false);
  setNewPurchase({
    purchaseCode: '',
    purchaseName: '',
    purchaseUnit: '',
    orderDate: '',
    orderQty: 0,
    price: 0,
    remark: '',
  });
};

// 발주 수정 취소 시 처리하는 함수
export const handleCancelUpdate = (setIsUpdateClicked, setUpdatePurchase) => {
  setIsUpdateClicked(false);
  setUpdatePurchase(null);
};
