import header_hg_lightMode from '../images/bg-desktop-light.jpg'
import header_hg_darkMode from '../images/bg-desktop-dark.jpg'
import moon from '../images/icon-moon.svg'
import sun from '../images/icon-sun.svg'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import './TodoDesign.css'
import { useState, useEffect } from 'react'
import Filters from './filters'
import Error from './Errors'
import Edit from './Edit'

export default function Todo () {

  const [edit, setEdit] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentFilter, setCurrentFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [inputValue, setInputValue] = useState("") 
  const [inputValueClone, setInputValueClone] = useState("")
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('data')) || []
  });
  const [filteredItems, setFilteredItems] = useState(items);
  const [length, setLength] = useState(0)
  const [currentObject, setCurrentObject] = useState({})

  const reorderItems = (newItems) => {
    setItems(newItems);
  };

  useEffect(() => {
    // Check if user prefers dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);

    // items.map(item => {
      if (filter === "Completed") {
        setFilteredItems(items.filter((item) => item.completed));
      } else if (filter === "Active") {
        setFilteredItems(items.filter((item) => !item.completed));
      } else {
        setFilteredItems([...items]);
      }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleButton = () => {
    const findIndex = items.findIndex((item) => item.id === currentObject.id)
    if (findIndex === -1 ) {
      setCurrentObject({})
    }
    const taskObj = {
      text: inputValue,
      id: new Date().getTime(),
      completed: false,
    }

    if (!inputValue.trim()) {
      setErrorMessage("Input can't be empty!")
      setError(true)
      return
    } else if (items.some(item => item.text === taskObj.text)) {
      setErrorMessage("It already exists!")
      setError(true)
      return
    } else {
      setErrorMessage("")
      setError(false)
    }

    let newItems;
    if (findIndex === -1) {
      newItems = [taskObj, ...items];
      setCurrentObject({})
    } else {
      newItems = [...items];
      newItems[findIndex] = taskObj;
      setCurrentObject({})
      setEdit(false)
    }
    setItems(newItems);
    setInputValue("");    
  }

  const removeItem = (item_id) => {
    const element = items.findIndex((item) => item.id === item_id)
    items.splice(element , 1);
    let newItems = [...items];
    setItems(newItems);
  }

  const handleClearCompleted = () => {
      const completedElements = items.filter(item => !item.completed)
      setItems(completedElements)
  }

  const handleCompleted = (item_id) => {
    const newItems = items.map(item => 
      item.id === item_id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems)
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(items));
    const active = items.filter(item => !item.completed)
    setLength(active.length)
    setFilteredItems(items);
    if (currentFilter === "Completed") {
      setFilteredItems(items.filter((item) => item.completed));
    } else if (currentFilter === "Active") {
      setFilteredItems(items.filter((item) => !item.completed));
    } else {
      setFilteredItems([...items]);
    }
  }, [items, currentFilter])

  return (
    <>
    {edit && <Edit 
      currentObject={currentObject} 
      setCurrentObject={setCurrentObject} 
      handleButton={handleButton} 
      handleInput={handleInput} 
      setEdit={setEdit}
      setInputValue={setInputValue}
      setInputValueClone={setInputValueClone}
      inputValue={inputValue}
    />}
    {error && <Error 
      errorMessage={errorMessage} 
      setErrorMessage={setErrorMessage} 
      setError={setError}
    />}
    <header className='header'>
      <img className='header-img' src={isDarkMode ? header_hg_darkMode : header_hg_lightMode} alt='header-background'/>
    </header>

    <main className='main'>
      <div className='main-wrapper'>
        <div className='Todo'>
          <h1>TODO</h1>
          <button  
            style={{backgroundColor: "transparent", border: "none", cursor: "pointer"}} 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
          >
            <img className="moon-img" src={isDarkMode ? sun: moon} alt="moon"/>
          </button>
        </div>
        <div className='adding-todo first-todo'>
          <button onClick={() => handleButton()}></button>
          <input value={ edit ? inputValueClone : inputValue} onChange={(e)=> handleInput(e)}className="text-todo" type='text'placeholder='Create a new todo...'/>
        </div>
          <TodoList 
            items={filteredItems}
            removeItem={removeItem}
            handleCompleted={handleCompleted}
            setCurrentObject={setCurrentObject}
            setEdit={setEdit}
            setInputValueClone={setInputValueClone}
            inputValue={inputValue}
          />
        <TodoFooter 
          itemCount={length}
          currentFilter={currentFilter}
          handleFilterChange={handleFilterChange}
          handleClearCompleted={handleClearCompleted}
          reorderItems={reorderItems}
        />
        <div className='stuff display' style={{marginTop: "20px"}}>
          <Filters 
            currentFilter={currentFilter}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </main>
    <footer className='app-footer'>
      <p>Challenged by <a href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW" rel="noreferrer" target='_blank'>FrontendMentor</a> Coded by <a href='https://github.com/Fardindevm' target='_blank' rel="noreferrer">Fardindev</a></p>
      </footer>
    </>
  )
}