import { PiggyBank, TrendingUp, TrendingDown } from 'lucide-react'
import useTransactionStore from '../store/TransactionStore'
import CountUp from 'react-countup'



function StatsCards() {
  const transactions = useTransactionStore((state) => state.transactions)
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  
  const balance = income - expenses

  return (
    <div className='grid grid-cols-3 gap-4 mt-10 '>
        <Cards title='Total Balance' icon={<PiggyBank className='text-blue-600'/>} value={balance} color={'blue'}/>
        <Cards title='Income' icon={<TrendingUp className='text-green-600'/>} value={income} color={'green'}/>
        <Cards title='Expenses' icon={<TrendingDown className='text-red-600'/>} value={expenses} color={'red'}/>
    </div>
  )
}

function Cards({title, icon, value, color}) {
  
    return (
        <div className='p-8 bg-white shadow-md rounded-lg border border-gray-200 '>
            <div className='flex items-center justify-between' > <p className={`text-${color}-600 text-xl`}>{title}</p> {icon}</div>
            <p className={`text-${color}-600 text-2xl font-semibold`}>
              <CountUp
                start={0}
                end={value}
                duration={1.5}
                separator=","
                decimals={0}
                prefix="₦ "
              />
              </p>
        </div>
    )
}
export default StatsCards