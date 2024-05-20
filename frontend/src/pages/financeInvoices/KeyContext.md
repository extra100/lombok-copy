// MainComponent.jsx

import React, { useState, useEffect } from 'react'
import TableLengkap from './TableLengkap'
import { useFetchData } from '../fetch/fetchAllFI'

const MainComponent = () => {
  const { loading, invoiceDataKey } = useFetchData()
  const [keys, setKeys] = useState([])

  useEffect(() => {
    const invoiceKeys = invoiceDataKey.map((item) => item.key)
    setKeys(invoiceKeys as any)
  }, [invoiceDataKey])

  return (
    <div>
      <TableLengkap
        invoiceDataKey={invoiceDataKey}
        keys={keys}
        loading={loading}
      />
    </div>
  )
}

export default MainComponent
