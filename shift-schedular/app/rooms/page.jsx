/**
 * @author Sneha T
 */

"use client";

import LazyTable from '../components/ui/LazyTable'
import ModalComponent from '../components/ui/ModalComponent'
import { useDispatch, useSelector } from "react-redux";
import { addRooms, updateRoom, deleteRoom, loadRoomsFromStorage } from '../../lib/features/room/roomSlice'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function RoomsComponent() {

  const dispatch = useDispatch();
  const rooms = useSelector(state => state.roomslice.list)
  const [filteredRooms, setFilteredRooms] = useState([]);
  /**State to store modal status */
  const [open, setOpen] = useState(false)

  const [searchText, setSearchText] = useState("");

  const [editRooms, setEditRooms] = useState([])

  const [options, setOptions] = useState([])


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
    // --- EDIT ---
    if (editRooms) {

      console.log("daaasdaa",data);
      
      let updatedRooms = { ...editRooms, ...data };

      dispatch(updateRoom(updatedRooms));

      const updatedStorage = rooms.map(s =>
        s.id === updateRoom.id ? updateRoom : s
      );

      

      localStorage.setItem("roomsdata", JSON.stringify(updatedStorage));
    }

    // --- ADD ---
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
   * @param {*} id 
   */
  const onDelete = (id) => {

    dispatch(deleteRoom({ id: id }))

    let filteredData = rooms.filter((data) => data.id !== id)

    localStorage.setItem("roomsdata", JSON.stringify(filteredData))
  }

  /**
   * 
   * @param {*} id 
   */
  const onEdit = (id) => {
   
    setOpen(true);
    const blockEdit = rooms.find(item => item.id === id);
    setEditRooms(blockEdit || null);
  };


  return (
    <>

      <div className="head-part">
        <input placeholder="search-room"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className='add-button' onClick={() => setOpen(true)}><b>+ Add New Room</b></button>
      </div>
      <LazyTable
        columns={[{ key: "Name", title: "Room Name" },
        { key: "blocks", title: "Blocks" }]}
        data={filteredRooms.length ? filteredRooms : rooms}
        onDelete={onDelete}
        onEdit={onEdit}
        limit={5}
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
