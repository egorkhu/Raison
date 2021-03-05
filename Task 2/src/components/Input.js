import React from 'react'

export const Input = ({id, label, type, placeholder, value, onChange, readOnly, className}) => (
        <>
            <label
                htmlFor={id}
                className="mb-1"
            >{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                readOnly={readOnly}
                value={value}
            />
        </>
)