import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useFetchData } from './fetch/Fetch'

interface DataType {
  key: React.Key
  name: string
  age: number
  street: string
  building: string
  number: number
  companyAddress: string
  companyName: string
  gender: string
  warehouse: {
    id: number
    name: string
  }
}

const Aneh: React.FC = () => {
  const [data, setData] = useState<DataType[]>([])
  const { loading, invoiceData } = useFetchData()

  useEffect(() => {
    if (!loading && invoiceData) {
      const newData = []
      for (let i = 0; i < 100; i++) {
        newData.push({
          key: i,
          name: invoiceData[i % invoiceData.length].warehouse.name,
          age: i + 1,

          warehouse: invoiceData[i % invoiceData.length].warehouse,
        })
      }
      setData(newData as any)
    }
  }, [loading, invoiceData])

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Outlet',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'John',
          value: 'John',
        },
      ],
      onFilter: (value: any, record) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Aset Material',
      children: [
        {
          title: 'Gudang',
          dataIndex: 'building',
          key: 'building',
          width: 100,
          render: (text: string, record: DataType) => record.building,
        },
        {
          title: 'Unit',
          dataIndex: 'number',
          key: 'number',
          width: 100,
          render: (text: string, record: DataType) => record.number,
        },
      ],
    },
    {
      title: 'Kas',
      children: [
        {
          title: 'Keuangan',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 100,
          render: (text: string, record: DataType) => record.companyAddress,
        },
        {
          title: 'Unit + Kas',
          dataIndex: 'companyName',
          key: 'companyName',
          width: 100,
          render: (text: string, record: DataType) => record.companyName,
        },
      ],
    },
  ]

  return <Table columns={columns} dataSource={data} bordered size="middle" />
}

export default Aneh
