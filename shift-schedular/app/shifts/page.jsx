/**
 * @author Sneha T
 */

"use client";

import LazyTable from '../components/ui/LazyTable'

import ModalComponent from '../components/ui/ModalComponent'

import { useDispatch, useSelector } from "react-redux";

import { addShift, updateShift, deleteShift, loadShiftsFromStorage } from '../../lib/features/shift/shiftSlice'

import { useEffect, useState, useCallback } from "react";

import { v4 as uuidv4 } from 'uuid';

export default function ShiftComponent() {

  const dispatch = useDispatch();

  const shifts = useSelector(state => state.shiftslice.list)

  const [filteredShifts, setFilteredShifts] = useState([]);

  /**State to store modal status */
  const [open, setOpen] = useState(false)

  const [searchText, setSearchText] = useState("");

  const [editShift, setEditShift] = useState([])

  /**
   * Hondle close modal
   */
  const handleClose = () => {

    setOpen(false)

    setEditShift(null);

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
    /**EDIT */
    if (editShift) {
      let updatedShift = { ...editShift, ...data };

      dispatch(updateShift(updatedShift));

      const updatedStorage = shifts.map(s =>
        s.id === updatedShift.id ? updatedShift : s
      );

      localStorage.setItem("shiftsdata", JSON.stringify(updatedStorage));

    }

    /**ADD */
    else {

      const newShift = { id: uuidv4(), ...data };

      dispatch(addShift(newShift));

      const updated = [...shifts, newShift];

      localStorage.setItem("shiftsdata", JSON.stringify(updated));

    }

    setEditShift(null);
  };


  /**
   * 
   * @param {*} id 
   */
  const onDelete = useCallback((id) => {

    dispatch(deleteShift({ id: id }))

    let filteredData = shifts.filter((data) => data.id !== id)

    localStorage.setItem("shiftsdata", JSON.stringify(filteredData))

  }, [dispatch, shifts]);

  /**
   * 
   * @param {*} id 
   */
  const onEdit = useCallback((id) => {

    setOpen(true);

    const shiftEdit = shifts.find(item => item.id === id);

    setEditShift(shiftEdit || null);

  }, [shifts]);


  return (
    <>

      <div className="head-part">

        <input placeholder="search -shift"

          onChange={(e) => setSearchText(e.target.value)}

        />

        <button className='add-button' onClick={() => { setEditShift(null); setOpen(true); }}><b>+ Add New Shift</b></button>

      </div>

      <LazyTable

        columns={[{ key: "Name", title: "Shift" }]}

        data={filteredShifts.length ? filteredShifts : shifts}

        onDelete={onDelete}

        onEdit={onEdit}

        limit={5}

      />

      <ModalComponent

        open={open}

        onClose={handleClose}

        title={'Shift Modal'}

        fields={[
          { name: 'Name', placeholder: 'Shift Name', type: 'text' },

        ]}

        saveButtonName={'Save shift'}

        data={editShift}

        onSave={handleSaveShift}

      />

    </>

  );

}
