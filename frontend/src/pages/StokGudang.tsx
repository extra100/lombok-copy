import React, { useState } from 'react'
import { Table, Spin, Input } from 'antd'

import useFetchDataKey from './fetch/StockWarehouse'
interface WarehouseItem {
  productName: string
}

const StokOutlet = () => {
  const { warehouseData } = useFetchDataKey()

  const [searchText, setSearchText] = useState('')
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',

      filters: [{ text: 'Nama Produk', value: 'productName' }],
      onFilter: (value: any, record: any) =>
        record.productName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Gudang',
      dataIndex: 'outlet-2',
      key: 'outlet-2',
      render: (text: any) => text || 0,
    },
    {
      title: 'Nabila',
      dataIndex: 'outlet-3',
      key: 'outlet-3',
      render: (text: any) => text || 0,
    },
    {
      title: 'GR99',
      dataIndex: 'outlet-4',
      key: 'outlet-4',
      render: (text: any) => text || 0,
    },
    {
      title: 'B&B',
      dataIndex: 'outlet-5',
      key: 'outlet-5',
      render: (text: any) => text || 0,
    },
    {
      title: 'Jaya Mandiri',
      dataIndex: 'outlet-6',
      key: 'outlet-6',
      render: (text: any) => text || 0,
    },
    {
      title: 'Dunia Galvalum',
      dataIndex: 'outlet-7',
      key: 'outlet-7',
      render: (text: any) => text || 0,
    },
    {
      title: 'Bumi Gora',
      dataIndex: 'outlet-8',
      key: 'outlet-8',
      render: (text: any) => text || 0,
    },
    {
      title: 'LIT',
      dataIndex: 'outlet-10',
      key: 'outlet-10',
      render: (text: any) => text || 0,
    },
    {
      title: 'BAJA NTB',
      dataIndex: 'outlet-11',
      key: 'outlet-11',
      render: (text: any) => text || 0,
    },
    {
      title: 'NUSANTARA',
      dataIndex: 'outlet-12',
      key: 'outlet-12',
      render: (text: any) => text || 0,
    },
    {
      title: 'KARYA BAJA',
      dataIndex: 'outlet-13',
      key: 'outlet-13',
      render: (text: any) => text || 0,
    },
    {
      title: 'PRIMA JAYA',
      dataIndex: 'outlet-14',
      key: 'outlet-14',
      render: (text: any) => text || 0,
    },
    {
      title: 'SBI',
      dataIndex: 'outlet-15',
      key: 'outlet-15',
      render: (text: any) => text || 0,
    },
    {
      title: 'SAHABAT BARU',
      dataIndex: 'outlet-16',
      key: 'outlet-16',
      render: (text: any) => text || 0,
    },
    {
      title: 'ANEKA BARU',
      dataIndex: 'outlet-17',
      key: 'outlet-17',
      render: (text: any) => text || 0,
    },
    {
      title: 'GRAHA',
      dataIndex: 'outlet-18',
      key: 'outlet-18',
      render: (text: any) => text || 0,
    },
    {
      title: 'ALESHA',
      dataIndex: 'outlet-19',
      key: 'outlet-19',
      render: (text: any) => text || 0,
    },
    {
      title: 'HARMONY',
      dataIndex: 'outlet-20',
      key: 'outlet-20',
      render: (text: any) => text || 0,
    },
  ]

  const filteredData = warehouseData.filter((item: WarehouseItem) =>
    item.productName.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <>
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
    </>
  )
}

export default StokOutlet
