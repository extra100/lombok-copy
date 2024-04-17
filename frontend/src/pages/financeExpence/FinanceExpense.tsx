import React, { useState, useEffect } from 'react'
import { Table, DatePicker, Button, Popover, Select } from 'antd'
import moment, { Moment } from 'moment'
import { useFetchBankTrans } from '../fetch/useFetchBankTrans'
import { fetchWareHouses } from '../warehouse'
import { financeContact } from '../FinanceContact'
import { useFetchExpense } from './FetchFinanceExpense'

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
  const { loading: bankTransLoading, invoiceData } = useFetchExpense()

  const { loading: contactLoading, contacts } = financeContact()

  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([])
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<[Moment | null, Moment | null]>([
    null,
    null,
  ])

  const handleWarehouseChange = (selectedNames: string[]) => {
    setSelectedWarehouses(selectedNames)
  }

  const handleFilterClick = () => {
    setPopoverVisible(!popoverVisible)
  }

  const handlePopoverVisibleChange = (open: boolean) => {
    setPopoverVisible(open)
  }

  const formatDate = (date: Moment | null) =>
    date ? date.format('YYYY-MM-DD') : null

  const filteredData = invoiceData.filter((item: Invoice) => {
    const startDate =
      dateRange && dateRange[0] ? formatDate(dateRange[0]) : null
    const endDate = dateRange && dateRange[1] ? formatDate(dateRange[1]) : null

    const isDateMatch =
      (!startDate || moment(item.trans_date).isSameOrAfter(startDate, 'day')) &&
      (!endDate || moment(item.trans_date).isSameOrBefore(endDate, 'day'))

    const isWarehouseMatch =
      selectedWarehouses.length === 0 ||
      selectedWarehouses.includes(item.tags.name.toString())

    return isDateMatch && isWarehouseMatch
  })

  const groupedData: {
    [key: string]: { amount_after_tax: number; due: number }
  } = filteredData.reduce((acc: any, item: Invoice) => {
    const { contact_id, amount_after_tax } = item
    acc[contact_id] = acc[contact_id] || {
      amount_after_tax: 0,
      due: 0,
    }
    acc[contact_id].amount_after_tax += amount_after_tax

    return acc
  }, {})

  const summaryData = Object.entries(groupedData).map(
    ([contactId, { amount_after_tax }], index) => {
      const contactIdNumber = parseInt(contactId, 10)
      const foundContact = contacts.find(
        (contact) => contact.id === contactIdNumber
      )

      let contactName = ''
      if (foundContact) {
        const underscoreIndex = foundContact.name.indexOf('_')
        if (underscoreIndex !== -1) {
          contactName = foundContact.name.substring(0, underscoreIndex)
        } else {
          contactName = foundContact.name
        }
      } else {
        contactName = `id pelanggan ${contactId}`
      }

      return {
        key: index.toString(),
        contak: {
          id: contactIdNumber,
          name: contactName,
        },
        allAmount: amount_after_tax,
      }
    }
  )

  const totalAmountByPrefix: { [key: string]: number } = {}

  Object.entries(groupedData).forEach(([contactId, { amount_after_tax }]) => {
    const contactIdNumber = parseInt(contactId, 10)
    const foundContact = contacts.find(
      (contact) => contact.id === contactIdNumber
    )

    let contactName = ''
    if (foundContact) {
      const underscoreIndex = Math.max(foundContact.name.indexOf('_'))
      if (underscoreIndex !== -1) {
        contactName = foundContact.name.substring(0, underscoreIndex)
      } else {
        contactName = foundContact.name
      }
    } else {
      contactName = `id pelanggan ${contactId}`
    }

    if (contactName in totalAmountByPrefix) {
      totalAmountByPrefix[contactName] += amount_after_tax
    } else {
      totalAmountByPrefix[contactName] = amount_after_tax
    }
  })

  const summaryDataSource = Object.entries(totalAmountByPrefix).map(
    ([name, totalAmount], index) => ({
      key: index.toString(),
      contak: {
        id: index.toString(),
        name: name,
      },
      allAmount: totalAmount,
    })
  )
  const columns = [
    {
      title: 'Outlet',
      dataIndex: 'contak',
      key: 'contak',
      render: (contak: { id: string; name: string }) => contak.name,
    },
    {
      title: 'Total',
      dataIndex: 'allAmount',
      key: 'allAmount',
      render: (totalAmount: number) => totalAmount.toLocaleString(),
    },
  ]

  return (
    <div>
      <Popover
        content={
          <div>
            <DatePicker onChange={(dates) => setDateRange(dates as any)} />
            <Select
              mode="multiple"
              placeholder="Pilih Outlet"
              style={{ width: '100%', marginTop: 8 }}
              onChange={handleWarehouseChange}
            >
              {/* {wh.map((contak) => (
                <Option
                  key={contak.id}
                  value={contak.name}
                >{`Outlet ${contak.name}`}</Option>
              ))} */}
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
        dataSource={summaryData}
        loading={bankTransLoading || contactLoading}
      />
    </div>
  )
}

export default FinanceExpense
