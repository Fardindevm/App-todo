export default function Filters ({currentFilter, handleFilterChange}) {
  return (
    <div className='filters'>
        <button 
          className={`filter-btn ${currentFilter === 'All' ? 'active' : ''}`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'Active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'Completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
      </div>
  )
}