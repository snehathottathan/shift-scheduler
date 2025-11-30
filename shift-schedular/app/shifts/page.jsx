"use client";
import { Quotes } from "../components/quotes/Quotes";
import TableComponent from '../components/ui/TableComponent'
import ModalComponent from '../components/ui/ModalComponent'
import { useDispatch, useSelector } from "react-redux";
import { addShift, upadateShift, deleteShift, loadShiftsFromStorage } from '../../lib/features/shift/shiftSlice'
import { useEffect, useState } from "react";
import './shift.scss'
export default function ShiftComponent() {

  const dispatch = useDispatch();
  const shifts = useSelector(state => state.shiftslice.list)
  const [filteredShifts, setFilteredShifts] = useState([]);
  /**State to store modal status */
  const [open, setOpen] = useState(false)

 const [searchText, setSearchText] = useState("");

  /**
   * 
   */
  const handleClose = () => {
    setOpen(false)

    console.log("shifts", shifts);

  }

  /**
   * 
   */
  useEffect(() => {

    const stored = localStorage.getItem("shiftsdata");
    if (stored) {
      dispatch(loadShiftsFromStorage(JSON.parse(stored)))
    }
  }, [dispatch])

 useEffect(() => {
    const delay = setTimeout(() => {
      console.log("searchText",searchText);
      
        const value = searchText.toLowerCase();

        if (!value.trim()) {
            setFilteredShifts([]);
            return;
        }

        const res = shifts.filter(item =>
            (item['Name'] || "").toLowerCase().includes(value)
        );

        setFilteredShifts(res);
    }, 300);

    return () => clearTimeout(delay);
}, [searchText]);

  /**
   * 
   * @param {*} data 
   */
  const handleSaveShift = (data) => {

    dispatch(addShift(data))

    // Save to local storage (append to existing list)
    const updated = [...shifts, data];
    console.log("updated",updated);
    
    localStorage.setItem("shiftsdata", JSON.stringify(updated));

  }

  
  /**
   * 
   * @param {*} id 
   */
  const onSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (!value.trim()) {
        setFilteredShifts([]); 
        return;
    }

    const filtered = shifts.filter(item =>
        (item.shiftName || "").toLowerCase().includes(value)
    );

    setFilteredShifts(filtered);
};



  /**
   * 
   * @param {*} id 
   */
  const onDelete = (id) => {

    console.log("idd", id);

    dispatch(deleteShift({ id: id }))

    let filteredData = shifts.filter((data) => data.id !== id)

    localStorage.setItem("shiftsdata", JSON.stringify(filteredData))
  }

  return (
    <>
  
      <div className="shift-head">
        <input placeholder="search shift"
        onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => setOpen(true)}>Add new Shift</button>
      </div>
      <TableComponent
        columns={[{ title: "Shift" }]}
        data={filteredShifts.length ?filteredShifts :shifts}
        onDelete={onDelete}
        limit={2}
      />
      <ModalComponent
        open={open}
        onClose={handleClose}
        title={'Shift Modal'}
        fields={[
          { name: 'Name', placeholder: 'Shift Name', type: 'text' },

        ]}
        saveButtonName={'Save shift'}
        // data={shifts}
        onSave={handleSaveShift}
      />
    </>
  );
}
