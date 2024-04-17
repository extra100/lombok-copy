import React, { useState } from 'react'
import { Table, DatePicker, Button, Popover, Select } from 'antd'
import moment, { Moment } from 'moment'
import { useFetchData } from '../fetch/Fetch'
import { fetchWareHouses } from '../warehouse'
import { useFinanceWarehouses } from '../FinanceWarehouses'

const { Option } = Select
const { RangePicker } = DatePicker

interface Invoice {
  key: string
  amount_after_tax: number
  trans_date: string
  due: number
  warehouse_id: number
  warehouse: {
    id: number
    name: string
  }
}

function FinanceInvoices() {
  const { loading, invoiceData } = useFetchData()
  const { wh } = fetchWareHouses()

  const { financewarehouses } = useFinanceWarehouses()

  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([])
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<[Moment | null, Moment | null]>([
    null,
    null,
  ])

  const handleWarehouseChange = (two: string[]) => {
    setSelectedWarehouses(two)
  }

  const handleFilterClick = () => {
    setPopoverVisible(!popoverVisible)
  }

  const handlePopoverVisibleChange = (open: boolean) => {
    setPopoverVisible(open)
  }
  const formatDate = (three: Moment | null) =>
    three ? three.format('YYYY-MM-DD') : null

  const filteredData = invoiceData.filter((item: Invoice) => {
    const startDate =
      dateRange && dateRange[0] ? formatDate(dateRange[0]) : null
    const endDate = dateRange && dateRange[1] ? formatDate(dateRange[1]) : null

    const isDateMatch =
      (!startDate || moment(item.trans_date).isSameOrAfter(startDate, 'day')) &&
      (!endDate || moment(item.trans_date).isSameOrBefore(endDate, 'day'))

    const isWarehouseMatch =
      selectedWarehouses.length === 0 ||
      selectedWarehouses.includes(item.warehouse.name)

    return isDateMatch && isWarehouseMatch
  })

  const groupedData: {
    [key: string]: { amount_after_tax: number; due: number }
  } = filteredData.reduce((acc: any, item: Invoice) => {
    const { warehouse_id, amount_after_tax, due } = item
    acc[warehouse_id] = acc[warehouse_id] || { amount_after_tax: 0, due: 0 }
    acc[warehouse_id].amount_after_tax += amount_after_tax
    acc[warehouse_id].due += due
    return acc
  }, {})

  const summaryData = Object.entries(groupedData).map(
    ([warehouseId, { amount_after_tax, due }], index) => {
      const warehouseIdNumber = parseInt(warehouseId, 10)
      const foundWarehouse = wh.find(
        (item: any) => item.id === warehouseIdNumber
      )
      const warehouseName: any = foundWarehouse
        ? foundWarehouse.name
        : `Outlet ${warehouseId}`
      return {
        key: index.toString(),
        warehouse: { id: warehouseIdNumber, name: warehouseName as any },
        allAmount: amount_after_tax,

        allDue: due,
        paid: amount_after_tax - due,
      }
    }
  )
  const summaryDataWithProductValue = summaryData.map((item) => {
    const foundWarehouse = financewarehouses.find(
      (warehouse) => warehouse.id === item.warehouse.id
    )
    return {
      ...item,
      productValue: foundWarehouse ? foundWarehouse.product_val : 0,
      id: foundWarehouse ? foundWarehouse.id : 0,
    }
  })

  const reallyAll: { amount_after_tax: number; due: number } =
    filteredData.reduce(
      (acc: any, item: Invoice) => {
        acc.amount_after_tax += item.amount_after_tax
        acc.due += item.due
        return acc
      },
      { amount_after_tax: 0, due: 0 }
    )

  const summaryAll = [
    {
      key: 'total',
      warehouse: { id: 'total', name: 'Total' },
      allAmount: reallyAll.amount_after_tax,
      allDue: reallyAll.due,
      paid: reallyAll.amount_after_tax - reallyAll.due,
    },
  ]

  const totalAll = summaryData.reduce(
    (acc, item) => {
      acc.allAmount += item.allAmount
      acc.allDue += item.allDue
      acc.paid += item.paid
      return acc
    },
    { allAmount: 0, allDue: 0, paid: 0 }
  )
  const saringData = invoiceData.filter((x: Invoice) => {
    const awal = dateRange && dateRange[0] ? formatDate(dateRange[0]) : null
    const akhir = dateRange && dateRange[1] ? formatDate(dateRange[1]) : null

    const cocokTanggal =
      (!awal || moment(x.trans_date).isSameOrBefore(awal, 'day')) &&
      (!akhir || moment(x.trans_date).isSameOrAfter(akhir, 'day'))

    const cocokWh =
      selectedWarehouses.length === 0 ||
      selectedWarehouses.includes(x.warehouse.name)
    return cocokTanggal && cocokWh
  })

  const columns = [
    {
      title: 'Outlet',
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: (warehouse: { id: string; name: string }) => warehouse.name,
    },
    {
      title: 'Total Transaksi',
      dataIndex: 'allAmount',
      key: 'allAmount',
      render: (totalAmount: number) => totalAmount.toLocaleString(),
    },
    {
      title: 'Uang Masuk',
      dataIndex: 'paid',
      key: 'paid',
      render: (due: number) => due.toLocaleString(),
    },
    {
      title: 'Sisa Tagihan',
      dataIndex: 'allDue',
      key: 'allDue',
      render: (due: number) => due.toLocaleString(),
    },

    {
      title: 'Nilai Material',
      dataIndex: 'productValue',
      key: 'productValue',
      render: (productValue: any) => productValue.toLocaleString(),
    },
  ]

  return (
    <div>
      <Popover
        content={
          <div>
            <RangePicker onChange={(dates) => setDateRange(dates as any)} />
            <Select
              mode="multiple"
              placeholder="Pilih Outlet"
              style={{ width: '100%', marginTop: 8 }}
              onChange={handleWarehouseChange}
            >
              {wh.map((warehouse) => (
                <Option
                  key={warehouse.id}
                  value={warehouse.name}
                >{`Outlet ${warehouse.name}`}</Option>
              ))}
            </Select>
          </div>
        }
        trigger="click"
        open={popoverVisible}
        onOpenChange={handlePopoverVisibleChange}
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
      <Table
        columns={columns}
        dataSource={summaryDataWithProductValue}
        loading={loading}
      />
      <div className="ant-row mt-3" style={{ fontSize: '13px' }}>
        <div className="ant-col ant-col-10 ant-col-offset-6 text-right font-weight-bold">
          <span>Total Pembayaran Diterima</span>
        </div>
        <div className="ant-col ant-col-8 text-right font-weight-bold">
          <span className="total-amount">
            {totalAll.allAmount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="ant-row mt-3" style={{ fontSize: '13px' }}>
        <div className="ant-col ant-col-10 ant-col-offset-6 text-right font-weight-bold">
          <span>Total Terhutang</span>
        </div>
        <div className="ant-col ant-col-8 text-right font-weight-bold">
          <span className="total-amount">
            {totalAll.allDue.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="ant-row mt-3" style={{ fontSize: '13px' }}>
        <div className="ant-col ant-col-10 ant-col-offset-6 text-right font-weight-bold">
          <span>Terbayar</span>
        </div>
        <div className="ant-col ant-col-8 text-right font-weight-bold">
          <span className="total-amount">{totalAll.paid.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default FinanceInvoices
