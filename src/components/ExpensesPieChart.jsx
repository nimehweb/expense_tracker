import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS =['#e60049', '#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#ffa300', '#dc0ab4', '#b3d4ff', '#00bfa0'];
// ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#C49FFF', '#800080', '#FF6699', '#f46a9b'];

function ExpensesPieChart({transactions}) {
const expenseByCategory = transactions
  .filter((transaction) => transaction.type === 'expense')
  .reduce((acc, transaction) => {
    const category = transaction.category
    if (!acc[category]) {
      acc[category] = 0
    }
    acc[category] += transaction.amount
    return acc
  },{});

const pieData = Object.entries(expenseByCategory)
  .map(([category, total]) => ({ category, total }))

  return (
    <PieChart width={500} height={300}>
        <Pie
         data={pieData} 
         dataKey="total" 
         nameKey="category" 
         cx="50%"
          cy="50%"  
         label={({ name, percent }) =>
          `${name} ${(percent * 100).toFixed(0)}%`
        }     
          outerRadius={100} 
          fill="#8884d8" 
           >
        {pieData.map((entry, index) =>(
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
        ))}
        </Pie>
    <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default ExpensesPieChart