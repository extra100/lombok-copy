import React, { useState } from 'react'
import { Table, Input, Button, Spin } from 'antd'
import { hargaProduk } from './fetch/FInannceProduk'

const JenisHarga = () => {
  const { loading, invoiceData } = hargaProduk()
  const [searchText, setSearchText] = useState('')

  const columns = [
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'name',
      key: 'name',

      filters: [{ text: 'Nama Produk', value: 'name' }],
      onFilter: (value: any, record: any) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'harga ',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>{price.toLocaleString()}</span>,
    },

    {
      title: 'Retail',
      dataIndex: 'price',
      key: 'retailPrice',
      render: (price: number) => <span>{(price * 0.9).toLocaleString()}</span>,
    },

    {
      title: 'Applikator',
      dataIndex: 'price',
      key: 'retailPrice',
      render: (price: number) => <span>{(price * 0.84).toLocaleString()}</span>,
    },
    {
      title: 'Toko',
      dataIndex: 'price',
      key: 'retailPrice',
      render: (price: number) => <span>{(price * 0.82).toLocaleString()}</span>,
    },

    {
      title: 'Nego',
      dataIndex: 'price',
      key: 'retailPrice',
      render: (price: number) => (
        <span>{Math.round(price / 1.19).toLocaleString()}</span>
      ),
    },

    {
      title: 'Khusus',
      dataIndex: 'price',
      key: 'retailPrice',
      render: (price: number) => <span>{(price * 0.79).toLocaleString()}</span>,
    },
  ]
  const filteredData = invoiceData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Spin spinning={loading}>
      <Input
        style={{ marginBottom: '10px', width: '200px' }}
        placeholder="Cari produk..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </Spin>
  )
}

export default JenisHarga
