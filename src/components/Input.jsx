import React from 'react'

export default function Input({type, label, className, reference}) {
    return (
        <>
        {
            label && <label className={className}>{label}:</label>
        }
            <input type={type} ref={reference}/>
        </>
    )
}