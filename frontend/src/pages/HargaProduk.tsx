import React, { useState } from 'react'
import { Table, Input, Spin } from 'antd'
import { useHargaProduk } from './fetch/FInannceProduk'

const JenisHarga = () => {
  const { dataProduct, isDataLoaded } = useHargaProduk()
  const [searchText, setSearchText] = useState('')

  const columns = [
    {
      title: 'Code',
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
      title: 'Harga',
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
      key: 'applicatorPrice',
      render: (price: number) => <span>{(price * 0.84).toLocaleString()}</span>,
    },
    {
      title: 'Toko',
      dataIndex: 'price',
      key: 'tokoPrice',
      render: (price: number) => <span>{(price * 0.82).toLocaleString()}</span>,
    },
    {
      title: 'Nego',
      dataIndex: 'price',
      key: 'negoPrice',
      render: (price: number) => (
        <span>{Math.round(price / 1.19).toLocaleString()}</span>
      ),
    },
    {
      title: 'Khusus',
      dataIndex: 'price',
      key: 'khususPrice',
      render: (price: number) => <span>{(price * 0.79).toLocaleString()}</span>,
    },
  ]

  const filteredData = dataProduct.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <>
      <Input
        style={{ marginBottom: '10px', width: '200px' }}
        placeholder="Cari produk..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {isDataLoaded ? (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey={(record) => record.id}
        />
      ) : (
        <Spin spinning={!isDataLoaded} />
      )}
    </>
  )
}

export default JenisHarga
