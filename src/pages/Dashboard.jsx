import { useState } from 'react'
import Navbar from '../components/navbar'
import StatsCards from '../components/StatsCards'
import IncomeForm from '../components/incomeForm'
import ExpenseForm from '../components/ExpenseForm'
import useTransactionStore from '../store/TransactionStore'
import ExpensesBarChart from '../components/ExpensesBarChart'
import ExpensesPieChart from '../components/ExpensesPieChart'


function Dashboard() {
  const [displayIncomeForm, setDisplayIncomeForm] = useState(false)
  const [displayExpenseForm, setDisplayExpenseForm] = useState(false)
  const transactions = useTransactionStore((state) => state.transactions)
  return (
    <div>
    <Navbar />
    <div className ='pt-5 px-10 '>
    <h1 className='text-4xl font-semibold mb-2'>Dashboard</h1>
    <div className='flex justify-between items-center'>
        <p className='text-xl'>Welcome back, Emmanuel <span>👋</span></p>
        <div className='flex gap-4'>
            <button className=' border border-green-800 text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-green-800 hover:text-white cursor-pointer'
            onClick={() => setDisplayIncomeForm(true)}
            >
                +Add income
            </button>
            <button className=' border border-red-800 text-red-800 px-4 py-2 rounded-md font-semibold hover:bg-red-800 hover:text-white cursor-pointer'
            onClick={() => setDisplayExpenseForm(true)}
            >
                +Add Expense
            </button>
        </div>
    </div>
     <StatsCards/>
     {displayIncomeForm && <IncomeForm display= {displayIncomeForm} handleDisplay= {() => setDisplayIncomeForm(false)} />}
     {displayExpenseForm && <ExpenseForm display= {displayExpenseForm} handleDisplay= {() => setDisplayExpenseForm(false)}/>}
    <div className='grid grid-cols-2 gap-5 mt-5'>
    <div className='flex flex-col justify-center items-center p-5 bg-white shadow-md rounded-lg border border-gray-200 ' >
      <p className='text-2xl font-semibold mb-8'>Transactions</p>
      <ExpensesBarChart transactions={transactions}/>
    </div>
    <div className='flex flex-col justify-center items-center p-5 bg-white shadow-md rounded-lg border border-gray-200 ' >
      <p className='text-2xl font-semibold mb-8'>Expenses</p>
      <ExpensesPieChart transactions={transactions}/>
    </div>
    </div>
    
    
    </div>
    </div>
   
    

  )
}

export default Dashboard