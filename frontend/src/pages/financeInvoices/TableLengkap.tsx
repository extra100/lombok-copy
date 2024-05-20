import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useFetchDataKey } from '../fetch/fetchAllFI'

const TableLengkap = () => {
  const { loading, invoiceDataKey } = useFetchDataKey()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Amount After Tax',
      dataIndex: 'amount_after_tax',
      key: 'amount_after_tax',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'trans_date',
      key: 'trans_date',
    },
    {
      title: 'Due',
      dataIndex: 'due',
      key: 'due',
    },

    {
      title: 'Warehouse Name',
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: (warehouse: any) => <span>{warehouse.name}</span>,
    },
    {
      title: 'Contact ID',
      dataIndex: 'contact_id',
      key: 'contact_id',
    },
    {
      title: 'Reference Number',
      dataIndex: 'ref_number',
      key: 'ref_number',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: any) => (
        <ul>
          {products.map((product: any) => (
            <li key={product.name}>
              {product.name} - {product.qty} {product.unit}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Status ID',
      dataIndex: 'status_id',
      key: 'status_id',
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={invoiceDataKey}
      loading={loading}
      rowKey="key"
    />
  )
}

export default TableLengkap
