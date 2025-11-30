"use client";

import LazyTable from '../components/ui/LazyTable'
import ModalComponent from '../components/ui/ModalComponent'
import { useDispatch, useSelector } from "react-redux";
import { addBlock,updateBlock,deleteBlock,loadBlocksFromStorage} from '../../lib/features/block/blockSlice'
import { useEffect, useState } from "react";
// import './shift.scss'
import { usePathname } from "next/navigation";

export default function BlocksComponent() {

  const dispatch = useDispatch();
  const blocks = useSelector(state => state.blockslice.list)
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  /**State to store modal status */
  const [open, setOpen] = useState(false)

 const [searchText, setSearchText] = useState("");

 const [editBlock, setEditBlock] =useState([])

 const pathname = usePathname()

  /**
   * 
   */
  const handleClose = () => {
    setOpen(false)
  setEditBlock(null);
    console.log("blocks", blocks);

  }

  
  /**
   * 
   */
  useEffect(() => {

    const stored = localStorage.getItem("blocksdata");
    if (stored) {
      dispatch(loadBlocksFromStorage(JSON.parse(stored)))
    }

    console.log("blockss",filteredBlocks,blocks);
    
  }, [dispatch])

 useEffect(() => {
    const delay = setTimeout(() => {
      console.log("searchText",searchText);
      
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
    const newBlock = { id: Date.now(), ...data };

    dispatch(addBlock(newBlock));

    const updated = [...blocks, newBlock];

    console.log("updated",updated);
    

    localStorage.setItem("blocksdata", JSON.stringify(updated));
  }

  setEditBlock(null);
};

  /**
   * 
   * @param {*} id 
   */
  const onDelete = (id) => {

    console.log("idd", id);

    dispatch(deleteBlock({ id: id }))

    let filteredData = blocks.filter((data) => data.id !== id)

    localStorage.setItem("blocksdata", JSON.stringify(filteredData))
  }

  /**
   * 
   * @param {*} id 
   */
const onEdit = (id) => {
    console.log("iidd");
    
  setOpen(true);
  const blockEdit = blocks.find(item => item.id === id);
  setEditBlock(blockEdit || null);
};


  return (
    <>
  
      <div className="head-part">
        <input placeholder="search-block"
        onChange={(e) => setSearchText(e.target.value)}
        />
        <button className='add-button'onClick={() => setOpen(true)}><b>+ Add New Block</b></button>
      </div>
      <LazyTable
        columns={[{ key: "Name",title: "Blocks" }]}
        data={filteredBlocks.length ?filteredBlocks :blocks}
        onDelete={onDelete}
         onEdit={onEdit}
        limit={5}
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
