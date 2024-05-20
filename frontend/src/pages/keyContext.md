import React, { createContext, useContext } from 'react'
import useFetchData from './useFetchData' // asumsikan ini adalah hook yang kamu gunakan

// Membuat context baru
const FetchDataContext = createContext()

const FetchDataProvider = ({ children }) => {
  const { loading, invoiceData } = useFetchData() // Mengambil nilai dari hook

  return (
    <FetchDataContext.Provider value={{ loading, invoiceData }}>
      {children}
    </FetchDataContext.Provider>
  )
}

// Custom hook untuk menggunakan nilai-nilai loading dan invoiceData dari context
const useFetchDataContext = () => {
  return useContext(FetchDataContext)
}

export { FetchDataProvider, useFetchDataContext }
