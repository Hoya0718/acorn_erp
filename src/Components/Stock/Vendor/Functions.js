import axios from '../../../api/axios';
import DatePicker from 'react-datepicker';

export const fetchVendors = async (setVendors) => {
  try {
    const response = await axios.get('/vendor/list');
    setVendors(response.data);
  } catch (error) {
    console.error('Error fetching vendors:', error);
  }
};

export const handleAddClick = (setIsAddClicked, setIsUpdateClicked) => {
  setIsAddClicked(true);
  setIsUpdateClicked(false);
};

export const handleUpdateClick = (selectedVendors, vendors, setUpdateVendor, setIsUpdateClicked, setIsAddClicked) => {
  if (selectedVendors.length !== 1) {
    alert('수정할 거래처를 하나만 선택해 주세요.');
    return;
  }

  setIsUpdateClicked(true);
  setIsAddClicked(false);

  // 선택된 첫 번째 거래처의 정보를 updateVendor에 설정
  const selectedVendor = vendors.find(
    (vendor) => vendor.vendorCode === selectedVendors[0]
  );
  setUpdateVendor(selectedVendor);
};

export const handleDeleteClick = async (selectedVendors, vendors, setVendors, setSelectedVendors) => {
  if (selectedVendors.length === 0) {
    alert('삭제할 거래처를 선택해 주세요.');
    return;
  }

  if (window.confirm('선택된 항목들을 삭제하시겠습니까?')) {
    try {
      await Promise.all(
        selectedVendors.map(async (vendorCode) => {
          await axios.delete(`/vendor/${vendorCode}`);
        })
      );
      const updatedVendors = vendors.filter(
        (vendor) => !selectedVendors.includes(vendor.vendorCode)
      );
      setVendors(updatedVendors);
      setSelectedVendors([]);
    } catch (error) {
      console.error('Error deleting vendors:', error);
    }
  }
};

export const handleSubmitAdd = async (e, newVendor, vendors, setVendors, setIsAddClicked, setNewVendor, setSelectedVendors) => {
  e.preventDefault();
  try {
    const response = await axios.post('/vendor/add', newVendor);
    setVendors([response.data, ...vendors]);
    setIsAddClicked(false);
    setNewVendor({
      vendorName: '',
      vendorContact: '',
      vendorAddress: '',
      vendorRemark: '',
      deliverableStatus: false,
    });
    setSelectedVendors([]);
  } catch (error) {
    console.error('Error adding vendor:', error);
  }
};

export const handleSubmitUpdate = async (e, updateVendor, vendors, setVendors, setIsUpdateClicked, setUpdateVendor) => {
  e.preventDefault();
  try {
    await axios.put(`/vendor/${updateVendor.vendorCode}`, updateVendor); // 여기 수정 필요
    const updatedVendors = vendors.map((vendor) =>
      vendor.vendorCode === updateVendor.vendorCode ? updateVendor : vendor
    );
    setVendors(updatedVendors);
    setIsUpdateClicked(false);
    setUpdateVendor(null);
  } catch (error) {
    console.error('Error updating vendor:', error);
  }
};

export const handleCheckboxChange = (vendorCode, selectedVendors, setSelectedVendors) => {
  if (selectedVendors.includes(vendorCode)) {
    setSelectedVendors(selectedVendors.filter((code) => code !== vendorCode));
  } else {
    setSelectedVendors([...selectedVendors, vendorCode]);
  }
};

export const handleSelectAll = (selectAll, vendors, setSelectedVendors, setSelectAll) => {
  if (!selectAll) {
    const allVendorCodes = vendors.map((vendor) => vendor.vendorCode);
    setSelectedVendors(allVendorCodes);
  } else {
    setSelectedVendors([]);
  }
  setSelectAll(!selectAll);
};

export const handleChangeNewVendor = (field, value, newVendor, setNewVendor) => {
  setNewVendor({ ...newVendor, [field]: value });
};

export const handleChangeUpdateVendor = (field, value, updateVendor, setUpdateVendor) => {
  setUpdateVendor({ ...updateVendor, [field]: value });
};

export const handleCancelAdd = (setIsAddClicked, setNewVendor) => {
  setIsAddClicked(false);
  setNewVendor({
    vendorName: '',
    vendorContact: '',
    vendorAddress: '',
    vendorRemark: '',
    deliverableStatus: false,
  });
};

export const handleCancelUpdate = (setIsUpdateClicked, setUpdateVendor) => {
  setIsUpdateClicked(false);
  setUpdateVendor(null);
};


