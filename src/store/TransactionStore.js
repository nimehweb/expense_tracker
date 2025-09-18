import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useTransactionStore = create (
   persist(
   (set) => ({
  transactions: [],
  addTransaction: (transaction) =>
     set((state) => ({
         transactions: [
            ...state.transactions, 
            {id: Date.now(), ...transaction}
         ]
    })),
   deleteTransaction: (id) =>
      set((state) => ({
         transactions: state.transactions.filter((t) => !id.includes(t.id))
      })),
   editTransaction: (id, updatedTransaction) =>
      set((state) => ({
         transactions: state.transactions.map((t) => t.id === id ? {...t, ...updatedTransaction} : t)
      }))
   }),
   {name : "transaction-storage"}
   ))

export default useTransactionStore