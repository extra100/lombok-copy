import React, { useState } from 'react'
import { Table, Tag, Input } from 'antd'
import { useFetchData } from '../fetch/FetchFIid'

interface Item {
  id: number
  tran_id: number
  finance_account_id: number
  trans_type_id: number
  qty: number
  price: number
  price_after_tax: number
  amount: number
  amount_after_tax: number
  discount_percent: number
  discount_amount: number
  additional_discount_amount: number
  taxable: number
  tax: number
  subtotal: number
  product: {
    id: number
    name: string
    is_track: boolean
    avg_base_price: number
    base_price: number
    code: string
    bundle_type_id: number
    purchase_account_id: number
    sell_account_id: number
    unit_id: number
    pos_product_category_id: number
    wholesale_price: {
      price: number
      min_qty: number
      use_discount_percent: number
    }[]
    formatted: string
  }
}

interface Transaction {
  id: number
  bank_account_id: number
  trans_date: string
  trans_type_id: number
  memo: string
  currency_rate: number
  amount_after_tax: number
  business_tran_id: number
  bank_account: {
    id: number
    name: string
    ref_code: string
    currency_id: any
    parent_id: any
    is_parent: number
  }
}

interface Relation {
  id: number
  business_tran_id: number
  trans_type_id: number
  trans_date: string
  contact_id: number
  status_id: number
  amount: number
  amount_after_tax: number
  due: number
  bank_statement_id: any
  bank_account_id: number
  balance: number
  desc: string
  tax: any[]
  warehouse_id: any
  discount_percent: number
  discount_amount: number
  additional_discount_percent: number
  additional_discount_amount: number
  total_tax: number
  subtotal: number
  trans_type: string
}

interface Contact {
  id: number
  name: string
  group_id: number
  formatted: string
}

interface Tag {
  id: number
  name: string
}

interface InvoiceData {
  id: number
  business_tran_id: number | null
  trans_type_id: number
  trans_date: string
  due_date: string
  contact_id: number
  status_id: number
  ref_number: string
  amount: number
  amount_after_tax: number
  due: number
  warehouse_id: number
  discount_percent: number
  discount_amount: number
  additional_discount_percent: number
  additional_discount_amount: number
  total_tax: number
  subtotal: number
  payment_date: string
  items: Item[]
  transactions: Transaction[]
  relations: Relation[]
  contacts: Contact[]
  tags: Tag[]
}

const InvoiceTable: React.FC = () => {
  const { loading, invoiceData = [] } = useFetchData()
  console.log({ invoiceData })

  const [searchId, setSearchId] = useState<number | undefined>()

  const filteredData = searchId
    ? invoiceData?.filter((item: any) => item.id === searchId)
    : invoiceData

  const handleSearch = (value: string) => {
    const id = parseInt(value)
    if (!isNaN(id)) {
      setSearchId(id)
    } else {
      setSearchId(undefined)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Status', dataIndex: 'status_id', key: 'status_id' },
    { title: 'No inv', dataIndex: 'ref_number', key: 'ref_number' },
    { title: 'Date', dataIndex: 'trans_date', key: 'trans_date' },
    {
      title: 'Amount After Tax',
      dataIndex: 'amount_after_tax',
      key: 'amount_after_tax',
    },
    { title: 'Warehouse', dataIndex: 'warehouse_id', key: 'warehouse_id' },

    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: Tag[]) =>
        tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>),
    },

    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: Item[]) => (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product.name} - Qty: {item.qty} - Price: {item.price} -
              Amount: {item.amount}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions',
      render: (transactions: Transaction[]) => (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.trans_date} - Kas Bank:{' '}
              {transaction.bank_account.name} - Amount:{' '}
              {transaction.amount_after_tax}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Relations',
      dataIndex: 'relations',
      key: 'relations',
      render: (relations: Relation[]) => (
        <ul>
          {relations.map((relation) => (
            <li key={relation.id}>
              Contact ID: {relation.contact_id} - date: {relation.trans_date} -
              Amount: {relation.amount_after_tax}
            </li>
          ))}
        </ul>
      ),
    },
    // {
    //   title: 'Contacts',
    //   dataIndex: 'contacts',
    //   key: 'contacts',
    //   render: (contact: Contact | undefined) => (
    //     <ul>
    //       {contact ? <li key={contact.id}>{contact.name}</li> : <li>.</li>}
    //     </ul>
    //   ),
    // },
  ]

  return (
    <div>
      <Input.Search
        placeholder="Search by ID"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
        enterButton
      />
      <Table
        columns={columns}
        dataSource={filteredData || []}
        loading={loading}
        rowKey="id"
      />
    </div>
  )
}

export default InvoiceTable
