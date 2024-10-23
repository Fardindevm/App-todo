import './Errors.css'

export default function Error ({errorMessage, setErrorMessage, setError}) {
  return (
    <div className='error-parent'>
      <div className="error-div">
        <h1 className="error-h1">ERROR</h1>
        <p className="error-p">{errorMessage}</p>
        <button className='stop-error' onClick={() => {setErrorMessage(false); setError(false)}}>Got it!</button>
      </div>
    </div>
  )
}