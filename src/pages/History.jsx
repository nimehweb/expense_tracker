import React from 'react'
import Navbar from '../components/navbar'
import HistoryTable from '../components/HistoryTable'

function History() {
  return (
    <div>
        <Navbar />
        <div className='pt-5 px-10 '>
        <h1 className='text-4xl font-semibold mb-2'> Transanction History</h1>
        </div>
        <div className='flex justify-between items-center px-10 mt-5'>
        <div>
        Calender Placeholder
        </div>
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
        <div className='px-10 mt-10'>
            <HistoryTable />
        </div>
    </div>
  )
}

export default History


   {/* <div className='px-10 mt-10'>
         <table className='w-full text-left border border-gray-200 rounded-lg '>
            <thead>
                <tr className='hover:bg-gray-100 border-b border-gray-200'>
                    <th className='p-3'>
                        <input type="checkbox" className='size-4' />
                    </th>
                    <th className='p-3'>Date</th>
                    <th className='p-3'>Amount</th>
                    <th className='p-3'>Category</th>
                    <th className='p-3'>Description</th>
                    <th className='p-3'>Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions.length === 0 && (
                        <tr className='border-t border-gray-200 hover:bg-gray-100'>
                            <td colSpan="6" className='text-center p-5'>No transactions found</td>
                        </tr>
                    )
                }
                {
                    transactions.map((transaction, index)=> (
                        <tr key={index} className='border-t border-gray-200 hover:bg-gray-100'>
                            <td className ='p-3'><input type="checkbox" className='size-4 ' /></td>
                            <td className ='p-3'>{transaction.date}</td>
                            <td className='p-3'>
                                <span
                                className={`px-2 py-1 rounded-lg text-sm font-medium ${transaction.type == 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`}
                                >
                                 {transaction.type == 'income' ? '+' : '-'}₦{transaction.amount}
                                </span>
                            </td>
                            <td className='p-3'>{ transaction.type == 'income' ? 'Income' : transaction.category}</td>
                            <td className='p-3'>{transaction.description}</td>
                            <td className='p-3'
                                <button className=' bg-gradient-to-bl from-blue-600 to-blue-700 text-white text-sm px-3 py-1 rounded-md cursor-pointer flex items-center gap-2 hover:opacity-90'>
                                    <Edit className='w-4 h-4' />
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div> */}