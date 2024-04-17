import React, { useState } from 'react'
import { Table, DatePicker, Button, Popover, Select } from 'antd'
import moment, { Moment } from 'moment'
import { useFetchData } from '../fetch/Fetch'

const { Option } = Select
const { RangePicker } = DatePicker

interface Invoice {
  key: string
  amount_after_tax: number
  trans_date: string
  due: number
  warehouse_id: number
}

function FinanceInvoices() {
  const { loading, invoiceData } = useFetchData()
  const [selectedWarehouses, setSelectedWarehouses] = useState<number[]>([])
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<[Moment | null, Moment | null]>([
    null,
    null,
  ])
  console.log({ dateRange })
  const handleWarehouseChange = (value: number[]) => {
    setSelectedWarehouses(value)
  }

  const handleFilterClick = () => {
    setPopoverVisible(!popoverVisible)
  }

  const handlePopoverVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible)
  }

  // Filter data berdasarkan tanggal dan warehouse_id
  // Filter data berdasarkan tanggal dan warehouse_id
  const filteredData = invoiceData.filter((item: Invoice) => {
    const transactionDate = moment(item.trans_date, 'YYYY-MM-DD')
    const isDateMatch =
      (!dateRange[0] || transactionDate.isSameOrAfter(dateRange[0], 'day')) &&
      (!dateRange[1] || transactionDate.isSameOrBefore(dateRange[1], 'day'))
    const isWarehouseMatch =
      selectedWarehouses.length === 0 ||
      selectedWarehouses.includes(item.warehouse_id)
    return isDateMatch && isWarehouseMatch
  })

  console.log({ filteredData })
  // Mengelompokkan data berdasarkan warehouse_id
  const groupedData: {
    [key: number]: { amount_after_tax: number; due: number }
  } = {}
  filteredData.forEach((item: Invoice) => {
    const warehouseId = item.warehouse_id
    if (!groupedData[warehouseId]) {
      groupedData[warehouseId] = {
        amount_after_tax: 0,
        due: 0,
      }
    }
    groupedData[warehouseId].amount_after_tax += item.amount_after_tax
    groupedData[warehouseId].due += item.due
  })

  // Merangkum data untuk ditampilkan dalam tabel
  const summaryData = Object.keys(groupedData).map(
    (warehouseId: string, index: number) => ({
      key: index.toString(),
      warehouse: { id: warehouseId },
      allAmount: groupedData[Number(warehouseId)].amount_after_tax,
      allDue: groupedData[Number(warehouseId)].due,
    })
  )

  const columns = [
    {
      title: 'Outlet',
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: (warehouse: { id: string }) => `Outlet ${warehouse.id}`,
    },
    {
      title: 'Total Terbayar',
      dataIndex: 'allAmount',
      key: 'allAmount',
      render: (totalAmount: number) => totalAmount.toLocaleString(),
    },
    {
      title: 'Hutang',
      dataIndex: 'allDue',
      key: 'allDue',
      render: (due: number) => due.toLocaleString(),
    },
  ]

  return (
    <div>
      <Popover
        content={
          <div>
            {/* Menggunakan RangePicker untuk memilih rentang tanggal */}
            <RangePicker onChange={(dates) => setDateRange(dates)} />
            <Select
              mode="multiple"
              placeholder="Pilih Outlet"
              style={{ width: '100%', marginTop: 8 }}
              onChange={handleWarehouseChange}
            >
              {Array.from(
                new Set(invoiceData.map((item) => item.warehouse_id))
              ).map((warehouseId) => (
                <Option
                  key={warehouseId}
                  value={warehouseId}
                >{`Outlet ${warehouseId}`}</Option>
              ))}
            </Select>
          </div>
        }
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={handlePopoverVisibleChange}
      >
        <Button title="Filter" id="btn-filter" onClick={handleFilterClick}>
          <span
            role="img"
            aria-label="filter"
            className="anticon anticon-filter"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="filter"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"></path>
            </svg>
          </span>
          <span>Filter</span>
        </Button>
      </Popover>
      <Table columns={columns} dataSource={summaryData} loading={loading} />
    </div>
  )
}

export default FinanceInvoices
