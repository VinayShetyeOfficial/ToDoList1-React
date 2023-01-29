import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const ListCom = ({id, text}) => {

    const [strikeOff, setStrikeOff] = useState(false)

    const accomplished = (id) => {
        setStrikeOff(!strikeOff)
    }

    return <li id={id} style={{textDecoration: strikeOff ? "line-through" : "none"}}><span className="trash-icon" onClick={accomplished}><DeleteIcon className="icon"/></span>{text}</li>
}

export default ListCom