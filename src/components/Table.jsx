import React from 'react'

export default function Table({ headers, data, className,onRowClick }) {
    return (
        <table>
            <thead>
                <tr>
                    {
                        headers.map((head, index) => (
                            <th key={index}>
                                {head}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((contact, index) => (
                        <tr key={index} className={className} onClick={() => onRowClick(contact)}>
                            <td>{contact.nombre}</td>
                            <td>{contact.apellido}</td>
                            <td>{contact.telefono}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
