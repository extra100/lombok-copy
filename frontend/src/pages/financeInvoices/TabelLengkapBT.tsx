import React, { useState } from 'react'
import { Table, Input, Button } from 'antd'
import { useFetchData } from '../fetch/FetchAllBT'

const TableLengkapBT = () => {
  const { loading, bankTrans } = useFetchData()
  const [filterId, setFilterId] = useState('')

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'trans_date',
      key: 'trans_date',
    },
    {
      title: 'Status ID',
      dataIndex: 'status_id',
      key: 'status_id',
    },
    {
      title: 'Contact IDs',
      dataIndex: 'contact_id',
      key: 'contact_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Amount After Tax',
      dataIndex: 'amount_after_tax',
      key: 'amount_after_tax',
    },
    {
      title: 'Trans Type ID',
      dataIndex: 'trans_type_id',
      key: 'trans_type_id',
    },
    {
      title: 'Reference Number',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: any) => (
        <span>
          {tags.map((tag: any) => (
            <span key={tag.id} style={{ margin: '0 5px' }}>
              {tag.name}
            </span>
          ))}
        </span>
      ),
    },
  ]

  const filteredData = bankTrans.filter((item) =>
    item.tags.some((tag) => tag.name.includes(filterId))
  )
  const handleFilterChange = (e: any) => {
    setFilterId(e.target.value)
  }

  const handleResetFilter = () => {
    setFilterId('')
  }

  return (
    <div>
      <Input
        placeholder="Filter by ID"
        value={filterId}
        onChange={handleFilterChange}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button onClick={handleResetFilter}>Reset</Button>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />
    </div>
  )
}

export default TableLengkapBT
