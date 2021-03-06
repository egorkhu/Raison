import React from 'react'

export const Alert = ({message, type, onClose}) => (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        {message}
        <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
        />
    </div>
)

