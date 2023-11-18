import React from 'react'

const Inputfield = ({type, placeholder, handleChange, name}) => {
  return (
    <div>
        <h3>{name}</h3>
        {type === "textarea" ? <textarea placeholder={placeholder} onChange={handleChange} name={name}/> : 
        <input type={type} placeholder={placeholder} onChange={handleChange} name={name}/>
  }
    </div>
  )
}

export default Inputfield