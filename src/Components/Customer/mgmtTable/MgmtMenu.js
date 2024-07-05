import React from 'react';
import SearchModule from '../modules/SearchModule';
import PeriodSearchButtonModule from '../modules/PeriodSearchModule';
import SearchButtonModule from '../modules/SearchButtonModule';
import DropdownModule from '../modules/DropdownModule';


const Mgmtmenu = ({
    handleEditModeClick, handleAddModeClick,
    handleDeleteClick, handleSaveClick, handleCloseClick, handleAddClick,
    setRowsPerPage, onUpdateMode, onAddMode, isAnyRowSelected
}) => {
    const [period, setPeriod] = React.useState({});
    const [data, setData] = React.useState();

    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [selectedOption_dropdown, setSelectedOption_dropdown] = React.useState('10줄 보기');

    const handleSelect_dropdown = (option) => {
        setSelectedOption_dropdown(option);
        const newRowsPerPage = Number(option.replace('줄 보기', ''));
        setRowsPerPage(newRowsPerPage);
        localStorage.setItem('CusMgmtRowsPerPage', newRowsPerPage);
    }

    const dropdownData = ['10줄 보기', '20줄 보기', '30줄 보기', '40줄 보기', '50줄 보기'];

    return (
        <div>
            <div className='items-subTitle righted'>
                <span>
                    {!onUpdateMode && isAnyRowSelected ? (
                        <>
                            <button onClick={handleEditModeClick}>수정</button>
                            <button onClick={handleDeleteClick}>삭제</button>
                        </>
                    ) : null}
                    {onUpdateMode && isAnyRowSelected ? (
                        <>
                            <button onClick={() => handleSaveClick(data.customerId)}>수정 확인</button>
                            <button onClick={handleCloseClick}>취소</button>
                        </>
                    ) :
                        null
                    }
                    {onAddMode && !isAnyRowSelected ? (
                        <>
                            <button onClick={() => handleAddClick(data)}> 등록 확인</button>
                            <button onClick={handleCloseClick}>취소</button>
                        </>
                    ) : null
                    }
                    {!onAddMode && !onUpdateMode && !isAnyRowSelected ? (
                        <button onClick={handleAddModeClick}>등록</button>
                    ) : null}
                </span>
            </div>
            <PeriodSearchButtonModule setPeriod={setPeriod} />

            <div className='row'> 
                <div className='col-1'>
                    <DropdownModule
                        selectedOption={selectedOption_dropdown}
                        handleSelect={handleSelect_dropdown}
                        options={dropdownData}
                    />
                </div>
                <div className='col-10 righted'  style={{margin:'0'}} >
                    <SearchModule />
                </div>
                <div className='col-1'>
                    <SearchButtonModule />
                </div>
            </div>
        </div>
    );
};

export default Mgmtmenu;
