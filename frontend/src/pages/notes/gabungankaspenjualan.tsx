import React, { useState } from 'react'
import { Table, Input } from 'antd'
import { useFetchData } from '../fetch/FetchFIid'

interface Relation {
  id: number
  amount_after_tax: number
}

interface InvoiceData {
  id: number
  warehouse_id: any
  relations: Relation[] | null
}

const Aat: React.FC = () => {
  const { loading, invoiceData = [] } = useFetchData()
  const [searchId, setSearchId] = useState<string>('')

  const handleSearch = (value: string) => {
    setSearchId(value)
  }

  const columns = [
    {
      title: 'ID gudang',
      dataIndex: 'warehouse_id',
      key: 'warehouse_id',
    },

    {
      title: 'Total',
      dataIndex: 'total_amount_after_tax',
      key: 'total_amount_after_tax',
      render: (_: any, record: any) => record.total_amount_after_tax,
    },
  ]

  const groupedData = invoiceData?.reduce((acc: any, item: InvoiceData) => {
    const warehouseId = item.warehouse_id.toString()
    if (!acc[warehouseId]) {
      acc[warehouseId] = {
        warehouse_id: warehouseId,
        total_amount_after_tax: 0,
      }
    }
    if (item.relations) {
      item.relations.forEach((relation) => {
        acc[warehouseId].total_amount_after_tax += relation.amount_after_tax
      })
    }
    return acc
  }, {})

  const filteredData = Object.values(groupedData).filter((item: any) =>
    item.warehouse_id.toString().includes(searchId)
  )

  return (
    <div>
      <Input
        placeholder="Pilih Gudang"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        // dataSource={filteredData}
        loading={loading}
        rowKey="warehouse_id"
      />
    </div>
  )
}

export default Aat
