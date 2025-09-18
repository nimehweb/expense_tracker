import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function ExpensesBarChart({transactions}) {
    const expenseByDay = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
        const date = transaction.date
        if (!acc[date]) {
            acc[date] = 0
        }
        acc[date] += transaction.amount
        return acc
        },{});
    
    const barData = Object.entries(expenseByDay)
    .map(([date, amount]) => {
         const d = new Date(date)
         const formattedDate = d.toLocaleDateString('en-US',{
            month: 'short',
            day: 'numeric'
         });
         return {
            date: formattedDate,
            total: amount
        }
        })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return (
            <BarChart width={500} height={300} data={barData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
            <Legend />
            </BarChart>
        )
}

export default ExpensesBarChart