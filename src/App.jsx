import { useState, useEffect, useRef } from 'react'

import './App.css'
import Input from './components/Input'
import Button from './components/Button'
import Table from './components/Table'

function App() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedData, setSelectedData] = useState();

  const nameRef = useRef()
  const lastNameRef = useRef()
  const phoneRef = useRef()

  const selectContact = (contact) => {
    setSelectedData(contact)
    nameRef.current.value = contact.nombre
    lastNameRef.current.value = contact.apellido
    phoneRef.current.value = contact.telefono
  }

  function clearButton() {
    nameRef.current.value = ""
    lastNameRef.current.value = ""
    phoneRef.current.value = ""
  }

  const addContact = async (event) => {
      event.preventDefault()
      const nombre = nameRef.current.value
      const apellido = lastNameRef.current.value
      const telefono = phoneRef.current.value

      const newData = { nombre, apellido, telefono }


      try {
        const response = await fetch("http://www.raydelto.org/agenda.php", {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })

        if (response.ok) {
          const responseData = await response.json()

          setData([...data, responseData])

          nameRef.current.value = ""
          lastNameRef.current.value = ""
          phoneRef.current.value = ""
        }
        else {
          console.log("Connection Successful")
          window.location.reload()
        }
      }
      catch (error) {
        console.log("Red error")
      }
    // }
  }

  const inputs = [
    { label: "Name", type: "text", className: "except-labels", inputRef: nameRef },
    { label: "Last name", type: "text", className: "except-labels", inputRef: lastNameRef },
    { label: "Phone", type: "tel", className: "except-labels", inputRef: phoneRef },
  ]
  const headers = ["Name", "Last name", "Phone"]

  useEffect(() => {
    fetch("http://www.raydelto.org/agenda.php")
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
  }, [])

  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="container-all">
        <div className="container-form">
          <label htmlFor="" className="tittle-agenda">Contacts</label>
          <form action="">
            {
              inputs.map(input => (
                <Input type={input.type} reference={input.inputRef} label={input.label} className={input.className} key={input.label} />
              ))
            }
            <Button label={"Add contact"} className={"add-button"} id={"addButton"} onClick={addContact} />
          </form>
        </div>
        <div className="container-search-table">
          <div className="container-search">
            <div className="container-search-bar">
              <label htmlFor="" className="search-label">Search bar:</label>
              <input type="text" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="container-table">
            {
              filteredData && <Table headers={headers} data={filteredData} className="general-row" onRowClick={selectContact} />
            }
          </div>
          <div className="buttons-table">
            <Button label={"Clear"} className={"clear-button"} onClick={clearButton} />
          </div>
        </div>
      </div>
    </>
  )
}




export default App
