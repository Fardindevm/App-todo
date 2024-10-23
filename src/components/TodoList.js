import Cross from "../images/icon-cross.svg"
import './TodoList.css'
import pencil from '../images/download-icon-svg+create+edit+edit+file+office+pencil+writing+creativ+icon-1320185158722776676_0.svg'

export default function TodoList ({items, removeItem, handleCompleted, setCurrentObject, setEdit, setInputValueClone, inputValue}) {
  
  const handleEditButton = (item) => {
    setCurrentObject(item);
    setInputValueClone(inputValue)
    setEdit(true);
  }

  return (
    <>
      {items.length > 0 && (
       items.map(item => (
        <div key={item.id} className="adding-todo not-margin border-bottom">
          <input key={item.id + "key"} type="checkbox" checked={item.completed} id={item.id} className="checkbox" onChange={() => handleCompleted(item.id)}/>
          <label key={item.id + "label"} className={`label ${item.completed ? "line-through": ""}`} htmlFor={item.id}>{item.text}</label>
          {!item.completed && <button className="cross" style={{marginRight: "12px"}} onClick={() => handleEditButton(item)}>
            <img src={pencil} className="pencil" alt="edit-icon"/>
          </button>
          }
          <button key={item.id + "button"} id={item.id  + " cross"}className="cross" onClick={() => removeItem(item.id)}>
            <img src={Cross} key={item.id + "img"} alt="discard"/>
          </button>
        </div>
       ))
      )}
    </>
  )

}