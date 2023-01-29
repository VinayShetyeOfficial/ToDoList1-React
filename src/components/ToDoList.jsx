import React from 'react'

const ToDoList = ({id, item, onSelect, onEdit}) => {

    return (<li key={id}><i className="fa fa-times" aria-hidden="true" onClick={() => onSelect(id)}/>{item}<i id={id} className='fa fa-edit' onClick={() => onEdit(id)}></i></li>)
}

export default ToDoList