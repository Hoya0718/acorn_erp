import axios from '../../../api/axios';
import DatePicker from 'react-datepicker';

export const fetchPurchases = async (setPurchases) => {
  try {
    const response = await axios.get('/purchase/list');
    setPurchases(response.data);
  } catch (error) {
    console.error('Error fetching purchases:', error);
  }
};

export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

export const handleUpdateClick = (selectedPurchases, purchases, setUpdatePurchase, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedPurchases.length !== 1) {
    alert('수정할 발주 품목을 하나만 선택해 주세요.');
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 발주 품목의 정보를 updatePurchase에 설정
  const selectedPurchase = purchases.find(
    (purchase) => purchase.purchaseCode === selectedPurchases[0]
  );
  setUpdatePurchase(selectedPurchase);
};

export const handleDeleteClick = async (selectedPurchases, purchases, setPurchases, setSelectedPurchases) => {
  if (selectedPurchases.length === 0) {
    alert('삭제할 발주 품목을 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedPurchases.map(async (purchaseCode) => {
          await axios.delete(`/purchase/${purchaseCode}`);
        })
      );
      const updatedPurchases = purchases.filter(
        (purchase) => !selectedPurchases.includes(purchase.purchaseCode)
      );
      setPurchases(updatedPurchases);
      setSelectedPurchases([]);
    } catch (error) {
      console.error('Error deleting purchases:', error);
    }
  }
};

export const handleSubmitAdd = async (e, newPurchase, purchases, setPurchases, setIsAddClicked, setNewPurchase, setSelectedPurchases) => {
  e.preventDefault();
  try {
    const response = await axios.post('/purchase/add', newPurchase);
    setPurchases([response.data, ...purchases]);
    setIsAddClicked(false);
    setNewPurchase({
      purchaseName: '',
      purchaseUnit: '',
      orderDate: '',
      orderQty: 0,
      price: 0,
      remark: '',
    });
    setSelectedPurchases([]);
  } catch (error) {
    console.error('Error adding purchase:', error);
  }
};

export const handleSubmitUpdate = async (e, updatePurchase, purchases, setPurchases, setIsUpdateClicked, setUpdatePurchase) => {
  e.preventDefault();
  try {
    await axios.put(`/purchase/${updatePurchase.purchaseCode}`, updatePurchase);
    const updatedPurchases = purchases.map((purchase) =>
      purchase.purchaseCode === updatePurchase.purchaseCode ? updatePurchase : purchase
    );
    setPurchases(updatedPurchases);
    setIsUpdateClicked(false);
    setUpdatePurchase(null);
  } catch (error) {
    console.error('Error updating purchase:', error);
  }
};

export const handleCheckboxChange = (purchaseCode, selectedPurchases, setSelectedPurchases) => {
  if (selectedPurchases.includes(purchaseCode)) {
    setSelectedPurchases(selectedPurchases.filter((code) => code !== purchaseCode));
  } else {
    setSelectedPurchases([...selectedPurchases, purchaseCode]);
  }
};

export const handleSelectAll = (selectAll, purchases, setSelectedPurchases, setSelectAll) => {
  if (!selectAll) {
    const allPurchaseCodes = purchases.map((purchase) => purchase.purchaseCode);
    setSelectedPurchases(allPurchaseCodes);
  } else {
    setSelectedPurchases([]);
  }
  setSelectAll(!selectAll);
};

export const handleChangeNewPurchase = (field, value, newPurchase, setNewPurchase) => {
  setNewPurchase({ ...newPurchase, [field]: value });
};

export const handleChangeUpdatePurchase = (field, value, updatePurchase, setUpdatePurchase) => {
  setUpdatePurchase({ ...updatePurchase, [field]: value });
};

export const handleCancelAdd = (setIsAddClicked, setNewPurchase) => {
  setIsAddClicked(false);
  setNewPurchase({
    purchaseName: '',
    purchaseUnit: '',
    orderDate: '',
    orderQty: 0,
    price: 0,
    remark: '',
  });
};

export const handleCancelUpdate = (setIsUpdateClicked, setUpdatePurchase) => {
  setIsUpdateClicked(false);
  setUpdatePurchase(null);
};
