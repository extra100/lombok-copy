import React, { useState } from 'react'
import { Table, Input } from 'antd'
import { useFetchData } from './fetch/FetchFIid'

interface Relation {
  id: number
  amount_after_tax: number
  trans_date: string
}

interface InvoiceData {
  id: number
  warehouse_id: any
  relations: Relation[] | null
  amount_after_tax: number
  trans_date: string
}
//
const Aat: React.FC = () => {
  const { loading, invoiceData = [] } = useFetchData()

  console.log({ invoiceData })
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
      title: 'Tanggal Invoice',
      dataIndex: 'trans_date',
      key: 'trans_date',
    },
    {
      title: 'Total',
      dataIndex: 'total_amount_after_tax',
      key: 'total_amount_after_tax',
      render: (_: any, record: InvoiceData) =>
        record.relations
          ? record.relations.reduce(
              (acc, relation) => acc + relation.amount_after_tax,
              0
            )
          : 0,
    },
    {
      title: 'Relations',
      dataIndex: 'relations',
      key: 'relations',
      render: (relations: Relation[]) => (
        <ul>
          {relations.map((relation) => (
            <li key={relation.id}>{relation.trans_date}</li>
          ))}
        </ul>
      ),
    },
  ]

  const groupedData: { [key: string]: InvoiceData } = {}
  invoiceData?.forEach((item: InvoiceData) => {
    const warehouseId = item.warehouse_id.toString()
    if (!groupedData[warehouseId]) {
      groupedData[warehouseId] = { ...item, amount_after_tax: 0 }
    }
    if (item.relations) {
      item.relations.forEach((relation) => {
        groupedData[warehouseId].amount_after_tax += relation.amount_after_tax
      })
    }
  })

  const filteredData = Object.values(groupedData).filter((item: InvoiceData) =>
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
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />
    </div>
  )
}

export default Aat
