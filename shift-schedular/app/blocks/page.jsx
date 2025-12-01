/**
 * @author Sneha T
 */

"use client";

import LazyTable from '../components/ui/LazyTable'

import ModalComponent from '../components/ui/ModalComponent'

import { useDispatch, useSelector } from "react-redux";

import { addBlock, updateBlock, deleteBlock, loadBlocksFromStorage } from '../../lib/features/block/blockSlice'

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

export default function BlocksComponent() {

  const dispatch = useDispatch();

  const blocks = useSelector(state => state.blockslice.list)

  const [filteredBlocks, setFilteredBlocks] = useState([]);

  /**State to store modal status */
  const [open, setOpen] = useState(false)

  const [searchText, setSearchText] = useState("");

  const [editBlock, setEditBlock] = useState([])

  /**State to store page limit */
  const [pageLimit, setPageLimit] = useState(5);


  /**
   * Modal close function
   */
  const handleClose = () => {

    setOpen(false)

    setEditBlock(null);

  }
  /**
   * 
   * @param {*} newLimit 
   */

  const handleLimitChange = (newLimit) => {

    setPageLimit(newLimit);

  };


  /**
   * 
   */

  useEffect(() => {

    const stored = localStorage.getItem("blocksdata");

    if (stored) {

      dispatch(loadBlocksFromStorage(JSON.parse(stored)))

    }

  }, [dispatch])

  useEffect(() => {

    const delay = setTimeout(() => {
    
      const value = searchText.toLowerCase();

      if (!value.trim()) {

        setFilteredBlocks([]);

        return;

      }

      const res = blocks.filter(item =>

        (item['Name'] || "").toLowerCase().includes(value)

      );

      setFilteredBlocks(res);

    }, 300);

    return () => clearTimeout(delay);

  }, [searchText]);


  /**
  * 
  * @param {*} data 
  */
  const handleSaveBlocks = (data) => {
    // --- EDIT ---
    if (editBlock) {
      let updatedBlocks = { ...editBlock, ...data };

      dispatch(updateBlock(updatedBlocks));

      const updatedStorage = blocks.map(s =>
        s.id === updatedBlocks.id ? updatedBlocks : s
      );

      localStorage.setItem("blocksdata", JSON.stringify(updatedStorage));
    }

    // --- ADD ---
    else {
      const newBlock = { id: uuidv4(), ...data };

      dispatch(addBlock(newBlock));

      const updated = [...blocks, newBlock];

      localStorage.setItem("blocksdata", JSON.stringify(updated));
    }

    setEditBlock(null);
  };

  /**
   * 
   * @param {*} id 
   */
  const onDelete = (id) => {

    dispatch(deleteBlock({ id: id }))

    let filteredData = blocks.filter((data) => data.id !== id)

    localStorage.setItem("blocksdata", JSON.stringify(filteredData))
  }

  /**
   * 
   * @param {*} id 
   */
  const onEdit = (id) => {

    setOpen(true);

    const blockEdit = blocks.find(item => item.id === id);

    setEditBlock(blockEdit || null);

  };


  return (
    <>

      <p className="head-part">

        <input placeholder="search-block"

          onChange={(e) => setSearchText(e.target.value)}

        />

        <button className='add-button' onClick={() => { setEditBlock(null); setOpen(true) }}><b>+ Add New Block</b></button>

      </p>

      <LazyTable

        columns={[{ key: "Name", title: "Blocks" }]}

        data={filteredBlocks.length ? filteredBlocks : blocks}

        onDelete={onDelete}

        onEdit={onEdit}

        limit={pageLimit}

        onLimitChange={handleLimitChange}

      />

      <ModalComponent

        open={open}

        onClose={handleClose}

        title={'Block Modal'}

        fields={[

          { name: 'Name', placeholder: 'Block Name', type: 'text' },

        ]}

        saveButtonName={'Save Block'}

        data={editBlock}

        onSave={handleSaveBlocks}
      />
    </>
  );
}
