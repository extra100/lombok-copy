import React, { useState } from 'react'
import { Table, DatePicker, Button, Popover, Select } from 'antd'
import moment, { Moment } from 'moment'

import { fetchWareHouses } from '../warehouse'
import { useFinanceWarehouses } from '../FinanceWarehouses'
import { useFetchExpense } from './FetchFinanceExpense'

const { Option } = Select
const { RangePicker } = DatePicker

interface Invoice {
  contact_id: string
  due: string
  include_stats: string

  tags: {
    id: number
    name: string
  }
  contact_groups: number
  trans_date: number
  amount_after_tax: number
  ref_number: number
  paid_date: number
  product_id: number
}

function FinanceExpense() {
  const { loading, invoiceData } = useFetchExpense()
  console.log({ invoiceData })

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
      selectedWarehouses.includes(item.tags.name)

    return isDateMatch && isWarehouseMatch
  })
  console.log({ filteredData })

  const columns = [
    {
      title: 'Nama Tag',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => (
            <div key={tag.id}>{tag.name}</div>
          ))}
        </>
      ),
    },
    {
      title: 'Total Transaksi',
      dataIndex: 'amount_after_tax',
      key: 'amount_after_tax',
    },
    {
      title: 'Kontak ID',
      dataIndex: 'contact_id',
      key: 'contact_id',
    },
  ]

  return (
    <div>
      <Popover
        content={
          <div>
            <RangePicker onChange={(dates) => setDateRange(dates as any)} />
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
      <Table columns={columns} dataSource={filteredData} loading={loading} />
    </div>
  )
}

export default FinanceExpense
