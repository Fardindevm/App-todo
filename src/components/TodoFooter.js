import './TodoFooter.css'
import Filters from './filters';

export default function TodoFooter({ itemCount, currentFilter, handleFilterChange, handleClearCompleted }) {
  return (
    <div className='stuff'>
      <p className='items-count'>{itemCount} items left</p>
      <div className='pc-display'>
        <Filters 
        itemCount={itemCount}
        currentFilter={currentFilter}
        handleFilterChange={handleFilterChange}
        />
      </div>
      <button 
        className={`filter-btn clear-completed`}
        onClick={handleClearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}
