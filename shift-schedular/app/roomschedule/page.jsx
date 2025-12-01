/**
 * @author Sneha T
 */

"use client";

import { useSelector, useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";

import {

  addAssignment,

  removeAssignment,

  loadScheduleFromStorage,

} from "../../lib/features/roomsschedule/roomScheduleSlice";

import ModalComponent from "../components/ui/ModalComponent";

import "./roomschedule.scss";

export default function RoomScheduleComponent() {

  const dispatch = useDispatch();

  // Redux ONLY for assignments
  const assignments = useSelector((state) => state.roomscheduleslice.list);

  // Local states for blocks, rooms, shifts
  const [blocks, setBlocks] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [shifts, setShifts] = useState([]);

  // Modal state
  const [open, setOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");

  const [clickedCell, setClickedCell] = useState(null);

  const DAYS = ["Sunday", "Monday", "Wednesday", "Thursday", "Friday"];

  // Load blocks, rooms, shifts from localStorage
  useEffect(() => {
    const blocksData = JSON.parse(localStorage.getItem("blocksdata")) || [];

    const roomsData = JSON.parse(localStorage.getItem("roomsdata")) || [];

    const shiftsData = JSON.parse(localStorage.getItem("shiftsdata")) || [];

    setBlocks(blocksData);

    setRooms(roomsData);

    setShifts(shiftsData);

  }, []);

  // Load assignments from localStorage into Redux
  useEffect(() => {

    const raw = localStorage.getItem("assignmentsdata");

    let savedAssignments = [];

    if (raw && raw !== "undefined") {

      try {

        savedAssignments = JSON.parse(raw);

      } catch (err) {

        savedAssignments = [];

      }

    }

    if (Array.isArray(savedAssignments) && savedAssignments.length > 0) {

      dispatch(loadScheduleFromStorage(savedAssignments));

    }

  }, [dispatch]);

  // Save assignments to localStorage whenever they change
  useEffect(() => {

    localStorage.setItem("assignmentsdata", JSON.stringify(assignments));

  }, [assignments]);

  // Click empty cell → Add doctor
  const handleAddClick = (block, room, day, shift) => {

    setClickedCell({ block, room, day, shift });

    setModalMode("add");

    setOpen(true);

  };

  // Click assigned cell → Remove doctor
  const handleRemoveClick = (assignment) => {

    setClickedCell(assignment);

    setModalMode("remove");

    setOpen(true);

  };

  // Save actions
  const handleSave = (data) => {

    if (modalMode === "add") {

      const scheduleData = {

        block: clickedCell.block,

        room: clickedCell.room,

        day: clickedCell.day,

        shift: clickedCell.shift,

        doctor: data.Doctor,

      };

      dispatch(addAssignment(scheduleData));

    } else {

      dispatch(removeAssignment({ id: clickedCell.id }));

    }

    setOpen(false);

  };

  return (

    <div className="p-4">

      <div className="room-schedule">

        <table className="schedule-table">

          <thead>

            <tr>

              <th className="empty-header"></th>

              {blocks.map((block) => (

                <th

                  key={block.id}

                  colSpan={rooms.filter((r) => r.blocks === block.Name).length}

                  className="block-header"

                >
                  {block.Name}

                </th>

              ))}

            </tr>

            <tr>

              <th className="empty-header"></th>

              {blocks.map((block) =>

                rooms
                  .filter((r) => r.blocks === block.Name)

                  .map((room) => (

                    <th key={room.id} className="room-header">

                      {room.Name}

                    </th>

                  ))

              )}

            </tr>

          </thead>

          <tbody>

            {DAYS.map((day, key) => (

              <React.Fragment key={day}>

                {/* Day Section Header */}
                <tr style={{ backgroundColor: "#929292" }} key={day + "_header"}>

                  <td className="day-header"><b>{day}</b></td>

                  <td style={{ backgroundColor: "#F5F5F5" }}></td>

                </tr>

                {/* Shifts under day */}
                {shifts.map((shift) => (

                  <tr key={day + shift.Name}>

                    <td className="shift-cell">{shift.Name}</td>

                    {blocks.map((block) =>
                      rooms
                        .filter((r) => r.blocks === block.Name)

                        .map((room) => {

                          const assigned = assignments.find(

                            (a) =>
                              a.block === block.Name &&

                              a.room === room.Name &&

                              a.day === day &&

                              a.shift === shift.Name

                          );

                          return (

                            <td style={{ width: '180px' }}

                              key={room.id + shift.id + day}

                              className={assigned ? "filled-cell" : "empty-cell"}

                              onClick={() =>

                                assigned
                                  ? handleRemoveClick(assigned)
                                  : handleAddClick(block.Name, room.Name, day, shift.Name)

                              }

                            >
                              {assigned && (

                                <div className="assigned-wrapper">

                                  <span>{assigned.doctor}</span>

                                  <span className="delete-x">

                                    <i className="bi bi-x-lg"></i>

                                  </span>

                                </div>

                              )}

                            </td>

                          );

                        })

                    )}

                  </tr>

                ))}

              </React.Fragment>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}
      <ModalComponent

        open={open}

        onClose={() => setOpen(false)}

        title={modalMode === "add" ? "Add Doctor" : "Remove Doctor"}

        fields={

          modalMode === "add"
            ? [{ name: "Doctor", placeholder: "Doctor Name", type: "text" }]
            : []

        }

        onSave={handleSave}

        saveButtonName={modalMode === "add" ? "Assign Doctor" : "Remove"}

        data={modalMode === "add" ? {} : clickedCell}

      />

    </div>

  );

}

