/**
 * @author Sneha
 */
"use client";

import "./ModalComponent.scss";

import { useEffect, useState } from "react";

export default function ModalComponent({
    open,
    onClose,
    title,
    fields = [],
    options,
    saveButtonName,
    data,
    onSave,
    lists = []
}) {

    const [formData, setFormData] = useState({});

    const [errors, setErrors] = useState({});

    /** Handle input change */
    const handleChange = (e, name) => {

        setFormData((prev) => ({ ...prev, [name]: e.target.value }));

        setErrors((prev) => ({ ...prev, [name]: "" }));

    };

    /** Save handler */
    const handleSave = (e) => {

        e.preventDefault();

        const newErrors = {};

        const nameValue = formData["Name"]?.trim().toLowerCase() || "";

        /** Required field validation */
        fields.forEach((field) => {
            if (
                field.required &&
                (!formData[field.name] || formData[field.name].trim() === "")
            ) {
                newErrors[field.name] = `${field.placeholder || field.name} is required`;
            }
        });

        /** Duplicate validation */
        const exists = lists.some(

            (item) => item.Name.toLowerCase() === nameValue
        );

        if (exists) {
            newErrors["Name"] = "This name already exists.";
        }

        /** If any errors exist, stop */
        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);

            return;
        }

        /** Save data */

        onSave?.(formData);

        /** Cleanup */
        resetState();

        onClose();
    };

    /** Reset form & errors */
    const resetState = () => {

        setFormData({});

        setErrors({});
    };

    /** Reset form when modal opens/closes or data changes */
    useEffect(() => {

        if (open) {

            setErrors({});

            setFormData(data || {});

        } else {

            resetState();

        }
    }, [open, data?.Name]);


    if (!open) return null;

    return (

        <div className="modal-custom">

            <div className="modal-box">

                <div>
                    <b>{title}</b>
                </div>

                <form className="form-class" onSubmit={handleSave}>

                    <div className="form-div">

                        {fields.map((field) => (

                            <div key={field.name} className="field-wrapper">

                                {/* SELECT FIELD */}
                                {field.type === "select" ? (

                                    <select

                                        className={`input-class ${errors[field.name] ? "input-error" : ""}`}

                                        value={formData[field.name] || ""}

                                        onChange={(e) => handleChange(e, field.name)}

                                    >
                                        <option value="">

                                            -- Select {field.placeholder || field.name} --
                                        </option>

                                        {options?.map((opt) => (

                                            <option key={opt.Name} value={opt.Name}>

                                                {opt.Name}

                                            </option>

                                        ))}

                                    </select>

                                ) : field.type === "textarea" ? (

                                    <textarea

                                        className={`input-class textarea-class ${errors[field.name] ? "input-error" : ""}`}

                                        placeholder={field.placeholder}

                                        value={formData[field.name] || ""}

                                        onChange={(e) => handleChange(e, field.name)}

                                    />

                                ) : (
                                    <input

                                        className={`input-class ${errors[field.name] ? "input-error" : ""}`}

                                        type={field.type || "text"}

                                        placeholder={field.placeholder}

                                        value={formData[field.name] || ""}

                                        onChange={(e) => handleChange(e, field.name)}

                                    />
                                )}

                                {/* ERROR MESSAGE */}
                                {errors[field.name] && (

                                    <p className="error-text">{errors[field.name]}</p>

                                )}

                            </div>

                        ))}

                    </div>

                    <div className="modal-button">

                        <button

                            type="button"

                            className="button-close"

                            onClick={() => {

                                resetState();
                                onClose();

                            }}

                        >
                            Close
                        </button>

                        <button type="submit" className="save">
                            {saveButtonName}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}
