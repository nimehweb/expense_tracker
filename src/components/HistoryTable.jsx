import {useState} from 'react'
import {useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender} from '@tanstack/react-table'
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { format } from 'date-fns'
import useTransactionStore from '../store/TransactionStore'

function HistoryTable() {
    const transactions = useTransactionStore((state) => state.transactions)
    const deleteTransactions = useTransactionStore((state) => state.deleteTransaction)

    //UI state for table features
      const [sorting, setSorting] = useState([])
      const [selectedIds, setSelectedIds] = useState([])
    // Define Columns
    const columns = [
        {
            id: 'select',
            header: ({table}) => {
              const pageRows = table.getRowModel().rows
              const pageIds = pageRows.map((r) => r.original.id)
              const isAllPageRowsSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))
              return(
                <input
                  type="checkbox"
                  checked={isAllPageRowsSelected}
                  onChange={() => {
                  if (isAllPageRowsSelected) {
                  // unselect these page ids
                    setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)))
                  } else {
                  // add visible ids to selection (dedupe with Set)
                    setSelectedIds((prev) => [...new Set([...prev, ...pageIds])])
                }
                }}
              />
              )
            },
            cell: ({row}) => {
              const id = row.original.id
              const checked = selectedIds.includes(id)
              return(
                <input
                  type = 'checkbox'
                  checked = {checked}
                  onChange={() => {
                    if (checked) {
                      setSelectedIds((prev) => prev.filter((sid) => sid !== id))
                    } else {
                      setSelectedIds((prev) => [...prev, id])
                    }
                  }}
                />
              )
            }
        },
        {
            accessorKey: 'date',
             header: 'Date',
            cell: (info) =>{
                const val = info.getValue()
                return format(new Date(val), 'd MMMM, yyyy')
            }    
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({row}) => {
                const t = row.original
                return(
                    <span
                    className = {`px-2 py-1 rounded-full text-sm font-medium ${t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                        {t.type === 'income' ? '+' : '-'}₦ {t.amount.toLocaleString()}
                    </span>
                )
            }
        },
        {accessorKey: 'category', header: 'Category'},
        {accessorKey: 'description', header: 'Description', cell: (info) => info.getValue() || <p className='pl-10'>-</p>},
        {
            id: 'actions',
            header: 'Edit',
            cell: () =>{
              return(
                <button className=' bg-gradient-to-bl from-blue-600 to-blue-700 text-white text-sm px-3 py-1 rounded-md cursor-pointer flex items-center gap-2 hover:opacity-90'>
                    <Edit className='w-4 h-4' />
                    Edit
                </button>
              )      
            }
        }
    ]

  
    const [filtering, setFiltering] = useState("");

    // create table instance
    const table = useReactTable({
        data: transactions,
        columns,
        state: {sorting, globalFilter: filtering},
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
  return (
    <div>
        <div className='flex justify-between items-center mb-5'>
           <input type="text" placeholder='Search...' 
           className='border border-gray-200 rounded-md p-2 mb-5 '
          />
          {selectedIds.length > 0 && (
            <button
            onClick={() => {
              deleteTransactions(selectedIds)
              setSelectedIds([])
            }}
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center'
            >
              <Trash2 className='w-4 h-4 inline-block mr-2' />
              Delete ({selectedIds.length})
            </button>
          )}
        </div>
       
        <table className='w-full text-left border border-gray-200 rounded-lg '>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='hover:bg-gray-50'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 cursor-pointer "
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowUp className='w-4 h-4 inline-block ml-2' />,
                    desc: <ArrowDown className='w-4 h-4 inline-block ml-2' />,
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.length === 0 ?
          (
            <tr>
              <td colSpan={columns.length} className="text-center p-4  text-gray-500 ">
                No transactions found.
              </td>
            </tr>
          ):
          (table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )))}
        </tbody>
        </table>
    </div>
  )
}

export default HistoryTable