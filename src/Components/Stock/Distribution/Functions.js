import axios from '../../../api/axios';
import DatePicker from 'react-datepicker';

// distribution 데이터 가져오기
export const fetchDistributions = async (setDistributions) => {
  try {
    const response = await axios.get('/distribution/list');
    const distributions = response.data;
    setDistributions(distributions);
    console.log(distributions);
  } catch (error) {
    console.error('Error fetching distributions:', error);
  }
};


export const purchaseInfo = async () => {
  try {
    const purchaseResponse = await axios.get(`/purchase/list`);
    console.log('Purchase Info:', purchaseResponse.data); 
    return purchaseResponse.data; 
  } catch (error) {
    console.error('Error fetching purchase info:', error);
    throw error; // 예외 처리 필요
  }
};


export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

export const handleUpdateClick = (selectedDistributions, distributions, setUpdateDistribution, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedDistributions.length !== 1) {
    alert('수정할 발주 품목을 하나만 선택해 주세요.');
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 발주 품목의 정보를 updateDistribution에 설정
  const selectedDistribution = distributions.find(
    (distribution) => distribution.distributionCode === selectedDistributions[0]
  );
  setUpdateDistribution(selectedDistribution);
};

export const handleDeleteClick = async (selectedDistributions, distributions, setDistributions, setSelectedDistributions) => {
  if (selectedDistributions.length === 0) {
    alert('삭제할 발주 품목을 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedDistributions.map(async (distributionCode) => {
          await axios.delete(`/distribution/${distributionCode}`);
        })
      );
      const updatedDistributions = distributions.filter(
        (distribution) => !selectedDistributions.includes(distribution.distributionCode)
      );
      setDistributions(updatedDistributions);
      setSelectedDistributions([]);
    } catch (error) {
      console.error('Error deleting distributions:', error);
    }
  }
};

export const handleSubmitAdd = async (e, newDistribution, distributions, setDistributions, setIsAddClicked, setNewDistribution, setSelectedDistributions) => {
  e.preventDefault();
  try {
    const response = await axios.post('/distribution/add', newDistribution);
    setDistributions([response.data, ...distributions]);
    setIsAddClicked(false);
    setNewDistribution({
      receiptDate: '',
      initialQty: 0,
      receivedQty: 0,
      releaseQty: 0,
      currentQty: 0,
      expectedReceiptDate: '',
      purchase: null,
    });
    setSelectedDistributions([]);
  } catch (error) {
    console.error('Error adding distribution:', error);
  }
};

export const handleSubmitUpdate = async (e, updateDistribution, distributions, setDistributions, setIsUpdateClicked, setUpdateDistribution) => {
  e.preventDefault();
  try {
    await axios.put(`/distribution/${updateDistribution.distributionCode}`, updateDistribution);
    const updatedDistributions = distributions.map((distribution) =>
      distribution.distributionCode === updateDistribution.distributionCode ? updateDistribution : distribution
    );
    setDistributions(updatedDistributions);
    setIsUpdateClicked(false);
    setUpdateDistribution(null);
  } catch (error) {
    console.error('Error updating distribution:', error);
  }
};

export const handleCheckboxChange = (distributionCode, selectedDistributions, setSelectedDistributions) => {
  if (selectedDistributions.includes(distributionCode)) {
    setSelectedDistributions(selectedDistributions.filter((code) => code !== distributionCode));
  } else {
    setSelectedDistributions([...selectedDistributions, distributionCode]);
  }
};

export const handleSelectAll = (selectAll, distributions, setSelectedDistributions, setSelectAll) => {
  if (!selectAll) {
    const allDistributionCodes = distributions.map((distribution) => distribution.distributionCode);
    setSelectedDistributions(allDistributionCodes);
  } else {
    setSelectedDistributions([]);
  }
  setSelectAll(!selectAll);
};

export const handleChangeNewDistribution = (field, value, newDistribution, setNewDistribution) => {
  setNewDistribution({ ...newDistribution, [field]: value });
};

export const handleChangeUpdateDistribution = (field, value, updateDistribution, setUpdateDistribution) => {
  setUpdateDistribution({ ...updateDistribution, [field]: value });
};

export const handleCancelAdd = (setIsAddClicked, setNewDistribution) => {
  setIsAddClicked(false);
  setNewDistribution({
    receiptDate: '',
    initialQty: 0,
    receivedQty: 0,
    releaseQty: 0,
    currentQty: 0,
    expectedReceiptDate: '',
    purchase: null,
  });
};

export const handleCancelUpdate = (setIsUpdateClicked, setUpdateDistribution) => {
  setIsUpdateClicked(false);
  setUpdateDistribution(null);
};
