import './Edit.css'
import Cross from '../images/icon-cross.svg'

export default function Edit ({currentObject, setCurrentObject, handleButton, handleInput, setEdit, setInputValue}) {

  const handleSubmitBtn = () => {
    handleButton();
  }

  const handleEdit = () => {
    setCurrentObject({});
    setEdit(false)
    setInputValue("")
  }

  return (
    <div className="edit-parent">
      <div className="edit-div">
        <div className='edit-main'>
        <div>
          <h1 className='current-object-text'>Your Current Todo is: <span className='current-span'>{currentObject.text}</span></h1>
        </div>
        <div className='changing-div'>
          <h1 ><label className="changed-object-text"htmlFor={currentObject.id + " edit"}>Changing to:</label></h1>
          <input type="text" id={currentObject.id + " edit"} className="changed-input"onChange={(e) => handleInput(e)} placeholder='Your new todo...'></input>
        </div>
        <button className="edit-btn" onClick={() => handleSubmitBtn()}>Submit</button>
      </div>
      <button className='cross-edit-btn' onClick={() => handleEdit()}>
        <img className='Cross-edit' src={Cross} alt='Cross'></img>
      </button>
      </div>
    </div>
  )
}