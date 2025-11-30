"use client";

import './ModalComponent.scss'
import { useState } from 'react';

export default function ModalComponent({ open, onClose, title, fields = [],saveButtonName, onSave }) {

    const [formData, setFormData] = useState({});

    if (!open) return null;

    const handleChange = (e, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: e.target.value
        }));
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (onSave) onSave(formData);  
        onClose();  
        setFormData({})             
    }

    return (
        <div className="modal">
            <div className="modal-box">
                <div><b>{title}</b></div>
                <form className='form-class'>
                    <div className='form-div'>
                        {fields.map(field => (
                            <input className='input-class'
                                key={field.name}
                                type={field.type || 'text'}
                                placeholder={field.placeholder || ''}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field.name)}
                            />
                        ))}
                    </div>
                    <div className='modal-button'>
                        <button className="button-close" onClick={onClose}>Close</button>
                        <button type="submit" className="save" onClick={handleSave}>{saveButtonName}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
