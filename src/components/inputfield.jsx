import React from 'react'

const Inputfield = ({type, placeholder, handleChange, name, title}) => {
  return (
    <div>
        <h3>{title}</h3>
        {type === "textarea" ? <textarea placeholder={placeholder} onChange={handleChange} name={name}/> : 
        <input type={type} placeholder={placeholder} onChange={handleChange} name={name}/>
  }
    </div>
  )
}

export default Inputfield