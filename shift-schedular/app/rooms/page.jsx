/**
 * @author Sneha T
 */

"use client";

import LazyTable from '../components/ui/LazyTable'

import ModalComponent from '../components/ui/ModalComponent'

import { useDispatch, useSelector } from "react-redux";

import { addRooms, updateRoom, deleteRoom, loadRoomsFromStorage } from '../../lib/features/room/roomSlice'

import { useEffect, useState, useCallback } from "react";

import { v4 as uuidv4 } from 'uuid';

export default function RoomsComponent() {

  const dispatch = useDispatch();

  /** Data from store */
  const rooms = useSelector(state => state.roomslice.list)

  /**State to filter rooms */
  const [filteredRooms, setFilteredRooms] = useState([]);

  /**State to store modal status */
  const [open, setOpen] = useState(false)

  /**State to store search data */
  const [searchText, setSearchText] = useState("");

  /**State to store edited data */
  const [editRooms, setEditRooms] = useState([])

  const [options, setOptions] = useState([])

  /**State to store page limit */
  const [pageLimit, setPageLimit] = useState(5);
  /**
   * Handle Close of modal
   */
  const handleClose = () => {

    setOpen(false)

    setEditRooms(null);

  }

  /**
   * 
   */
  useEffect(() => {

    const stored = localStorage.getItem("roomsdata");

    if (stored) {

      dispatch(loadRoomsFromStorage(JSON.parse(stored)))

    }

  }, [dispatch])

  useEffect(() => {

    const delay = setTimeout(() => {

      const value = searchText.toLowerCase();

      if (!value.trim()) {
        setFilteredRooms([]);
        return;
      }

      const res = rooms.filter(item =>
        (item['Name'] || "").toLowerCase().includes(value)
      );

      setFilteredRooms(res);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchText]);

  /**
  * 
  * @param {*} data 
  */
  const handleSaveRooms = (data) => {
    /**EDIT */
    if (editRooms) {

      let updatedRooms = { ...editRooms, ...data };

      dispatch(updateRoom(updatedRooms));

      const updatedStorage = rooms.map(s =>
        s.id === updatedRooms.id ? updatedRooms : s
      );


      localStorage.setItem("roomsdata", JSON.stringify(updatedStorage));
    }

     /**ADD */
    else {
      const newRoom = { id: uuidv4(), ...data };

      dispatch(addRooms(newRoom));

      const updated = [...rooms, newRoom];

      localStorage.setItem("roomsdata", JSON.stringify(updated));
    }

    setEditRooms(null);
  };


  useEffect(() => {

    let data = localStorage.getItem("blocksdata")

    let parsedData = JSON.parse(data)

    setOptions(parsedData)

  }, [])

  /**
  * 
  * @param {*} newLimit 
  */
  const handleLimitChange = (newLimit) => {

    setPageLimit(newLimit);

  };

  /**
   * 
   * @param {*} id 
   */
  const onDelete = useCallback((id) => {

    dispatch(deleteRoom({ id }));

    const filtered = rooms.filter(data => data.id !== id);

    localStorage.setItem("roomsdata", JSON.stringify(filtered));

  }, [dispatch, rooms]);

  /**
   * 
   * @param {*} id 
   */
  const onEdit = useCallback((id) => {

    setOpen(true);

    const room = rooms.find(item => item.id === id);

    setEditRooms(room || null);

  }, [rooms]);



  return (

    <>

      <div className="head-part">

        <input placeholder="search-room"

          onChange={(e) => setSearchText(e.target.value)}

        />

        <button className='add-button' onClick={() => { setEditRooms(null); setOpen(true) }}><b>+ Add New Room</b></button>

      </div>

      <LazyTable

        columns={[{ key: "Name", title: "Room Name" },

        { key: "blocks", title: "Blocks" }]}

        data={filteredRooms.length ? filteredRooms : rooms}

        onDelete={onDelete}

        onEdit={onEdit}

        limit={pageLimit}

        onLimitChange={handleLimitChange}

      />

      <ModalComponent

        open={open}

        onClose={handleClose}

        title={'Room Modal'}

        fields={[

          { name: 'Name', placeholder: 'Room Name', type: 'text' },
          { name: 'blocks', placeholder: 'Blocks', type: 'select' },

        ]}

        options={options}

        saveButtonName={'Save Room'}

        data={editRooms}

        onSave={handleSaveRooms}

      />

    </>

  );

}
