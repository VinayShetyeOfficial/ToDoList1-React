import React, { useEffect, useState } from 'react'
import ToDoList from './components/ToDoList'

/* Get items from Local Storage */
const getLocalItems = () => {
    let list = localStorage.getItem('Lists')

    if (list) {
        return JSON.parse(list)
    }
    else {
        return []
    }
}

const App = () => {
    const [inputList, setInputList] = useState("")
    const [Items, setItems] = useState(getLocalItems)
    const [message, setMessage] = useState("")
    const [edit, setEdit] = useState({})

    const itemEvent = (event) => {
        setInputList(event.target.value)
    }

    const listOfItems = (event) => {

        if (inputList.length) {

            if (edit.flag) {
                const arr = Items.map((item, indx) => {
                    if (edit.id === indx) {
                        return inputList
                    }
                    else {
                        return item
                    }
                })
                
                setItems([...arr])
                setEdit({ id: null, flag: false })
                document.getElementById(String(edit.id)).classList.toggle('active')
                setInputList("")
                return
            }

            setItems([...Items, inputList])
            setInputList("")
        }
        else {
            setMessage("Please enter some ★[ᴛᴏᴅᴏ]★")

            setTimeout(() => {
                setMessage("")
            }, 2000)
        }
    }

    const editItem = (id) => {
        setInputList(Items[id])
        setEdit((preValue) => {
            return {
                id: id,
                flag: id === preValue.id ? !edit.flag : true,
            }
        })

        for (let i = 0; i < Items.length; i++) {
            if (i !== id) {
                document.getElementById(String(i)).classList.remove('active')
            }
        }

        document.getElementById(String(id)).classList.toggle('active')
    }

    const delItems = (id) => {
        setItems(Items.filter((item, indx) => {
            return id !== indx
        }))

        setInputList("")
    }

    
    /* Add data to Local Storage */
    useEffect(() => {
        localStorage.setItem('Lists', JSON.stringify(Items))
    }, [Items])


    return (
        <>
            <div className='main_div'>
                <div className='center_div'>
                    <br />
                    <h1>ToDo List</h1>
                    <br />
                    <input type="text" placeholder="Add a Items" value={inputList} onChange={itemEvent} />
                    <button onClick={listOfItems}>+</button>
                    <span className="message">{message}</span>
                    <ol className="todo_style">
                        {Items.length ? Items.map((item, indx) => {
                            return <ToDoList key={indx} id={indx} item={item} onSelect={delItems} onEdit={editItem} />
                        }) : <li className="listStatus">Nothing to Display !</li>}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default App