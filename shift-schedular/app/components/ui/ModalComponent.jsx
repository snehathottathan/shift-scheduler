/**
 * @author Sneha T
 */

"use client";

import './ModalComponent.scss'

import { useEffect, useState } from 'react';


export default function ModalComponent({ open, onClose, title, fields = [],options, saveButtonName, data, onSave }) {

    const [formData, setFormData] = useState({});

/**
 * 
 * @param {*} e 
 * @param {*} name 
 */
    const handleChange = (e, name) => {

        setFormData(prev => ({

            ...prev,

            [name]: e.target.value

        }));

    }

/**
 * 
 * @param {*} e 
 * 
 */
    const handleSave = (e) => {
        
        e.preventDefault();
        
        console.log("formData",formData);
        
        if (onSave) onSave(formData);

        onClose();

        setFormData({})

    }
/**
 * 
 */
    useEffect(() => {

        if (data) {

            setFormData(data)

        } else {

            setFormData({})
        }

    }, [data])


    if (!open) {

        return null;
    }


    return (

        <div className="modal-custom">

            <div className="modal-box">

                <div><b>{title}</b></div>

                <form className='form-class'>

                    <div className='form-div'>

                        {fields.map((field) => {

                            /** SELECT field */
                            if (field.type === "select") {

                                return (

                                    <select

                                        key={field.name}

                                        className="input-class"

                                        value={formData[field.name] || ""}

                                        onChange={(e) => handleChange(e, field.name)}
                                        
                                    >
                                       
                                        <option value="">-- Select {field.placeholder || field.name} --</option>

                                        {options?.map((opt) => (

                                            <option key={opt.Name} value={opt.Name}>

                                                {opt.Name}

                                            </option>

                                        ))}

                                    </select>
                             
                                );
                            }

                            /** TEXTAREA field */
                            if (field.type === "textarea") {

                                return (

                                    <textarea

                                        key={field.name}

                                        className="input-class textarea-class"

                                        placeholder={field.placeholder}

                                        value={formData[field.name] || ""}

                                        onChange={(e) => handleChange(e, field.name)}

                                    />

                                );

                            }

                            /** DEFAULT: INPUT */
                            return (

                                <input

                                    key={field.name}

                                    className="input-class"

                                    type={field.type || "text"}

                                    placeholder={field.placeholder}

                                    value={formData[field.name] || ""}

                                    onChange={(e) => handleChange(e, field.name)}

                                />

                            );

                        })}

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
