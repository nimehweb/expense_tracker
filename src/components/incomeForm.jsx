import { useState, useRef, useEffect } from "react"
import useTransactionStore from "../store/TransactionStore"

function IncomeForm({handleDisplay, display}) {
  const [income, setIncome] = useState({
    amount: '',
    description: "",
    category: 'Income',
    date: new Date().toISOString().slice(0, 10),
  })
  const addTransaction = useTransactionStore((state) => state.addTransaction)
  
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!income.amount){
      setError('Amount is required')
      return; 
    }
    addTransaction({
        type: 'income',
        amount: Number(income.amount),
        description: income.description,
        category: income.category,
        date: income.date,
      })
      setIncome({
        amount: '',
        description: "",
        date: new Date().toISOString().slice(0, 10),
      })
    handleDisplay()
  }

  const modalRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleDisplay()
      }
    }
    if(display){
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDisplay, display]);
  return(
  <div className='flex justify-center items-center fixed z-10 inset-0 backdop-brightness-50 bg-black/50'>
      <form ref = {modalRef} className='flex flex-col gap-4 p-5 bg-white shadow-md rounded-lg border border-gray-200' onSubmit={handleSubmit}>
       <div className='flex justify-between items-center gap-7'><p className='text-xl font-semibold'>Create a new <span className='text-green-600'>income</span> transaction</p> <span className='text-xl cursor-pointer font-semibold' onClick={handleDisplay}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span></div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Amount">Amount</label>
        <input type="text" id="Amount" placeholder="Enter amount" value={income.amount} onChange={(e) => setIncome({...income, amount: e.target.value})} className='border border-gray-200 rounded-md p-2' />
        { error && <p className='text-red-600 text-sm'>{error}</p>}
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Description">Description</label>
        <input type="text" id="Description" placeholder="Enter description" value={income.description} onChange={(e) => setIncome({...income, description: e.target.value})} className='border border-gray-200 rounded-md p-2' />
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Date">Transaction Date</label>
        <input type="date" id="Date" value={income.date} onChange={(e) => setIncome({...income, date: e.target.value})} className='border border-gray-200 rounded-md p-2' />
       </div>
       <div className='flex justify-end gap-2'>
        <button type="submit" className=' border border-green-600 text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-600 hover:text-white cursor-pointer'>Add new income</button>
       </div>
      </form>
    </div>
  )
 }


export default IncomeForm