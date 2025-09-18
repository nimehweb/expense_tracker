import { useState, useRef, useEffect } from "react"
import useTransactionStore from "../store/TransactionStore"

function ExpenseForm({handleDisplay, display}) {
  const [expense, setExpense] = useState({
    amount: '',
    description: "",
    category: "Others",
    date: new Date().toISOString().slice(0, 10),
  })

  const [error, setError] = useState('')

  const addTransaction = useTransactionStore((state) => state.addTransaction)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!expense.amount){
      setError('Amount is required')
      return; 
    }
    setError('')
    addTransaction({
        type: 'expense',
        amount: Number(expense.amount),
        description: expense.description,
        category: expense.category,
        date: expense.date,
      })
      setExpense({
        amount: '',
        description: "",
        category: "",
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
  return (
     <div className='flex justify-center items-center fixed z-10 inset-0 backdop-brightness-50 bg-black/50'>
      <form ref = {modalRef} className='flex flex-col gap-4 p-5 bg-white shadow-md rounded-lg border border-gray-200' onSubmit={handleSubmit}>
       <div className='flex justify-between items-center gap-7'><p className='text-xl font-semibold'>Create a new <span className='text-green-600'>expense</span> transaction</p> <span className='text-xl cursor-pointer font-semibold' onClick={handleDisplay}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span></div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Amount">Amount</label>
        <input type="text" id="Amount" placeholder="Enter amount" value={expense.amount} onChange={(e) => setExpense({...expense, amount: e.target.value})} className='border border-gray-200 rounded-md p-2' />
        { error && <p className='text-red-600 text-sm'>{error}</p>}
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Description">Description</label>
        <input type="text" id="Description" placeholder="Enter description" value={expense.description} onChange={(e) => setExpense({...expense, description: e.target.value})} className='border border-gray-200 rounded-md p-2' />
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Category">Category</label>
        <select name="Category" id="Category" value={expense.category} onChange={(e) => setExpense({...expense, category: e.target.value})} className='border border-gray-200 rounded-md p-2'>
            <option value="Others">Others</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Transportation">Transportation</option>
            <option value="Health">Health</option>
            <option value="Groceries">Groceries</option>
            <option value="Investments">Investments</option>
        </select>
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="Date">Transaction Date</label>
        <input type="date" id="Date" value={expense.date} onChange={(e) => setExpense({...expense, date: e.target.value})} className='border border-gray-200 rounded-md p-2' />
       </div>
       <div className='flex justify-end gap-2'>
        <button type="submit" className=' border border-red-600 text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-600 hover:text-white cursor-pointer'>Add new expense</button>
       </div>
      </form>
    </div>
  )
}

export default ExpenseForm