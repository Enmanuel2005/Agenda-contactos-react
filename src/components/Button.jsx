import React from 'react'

export default function Button({ label, className, id, onClick}) {
    return (
        <button className={className} id={id} onClick={onClick}>{label}</button>
    )
}
