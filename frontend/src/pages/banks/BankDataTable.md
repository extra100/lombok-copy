import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import { BankTransaction, useBankData } from './UseBankData'

function BankDataTable() {
  const { loading, pokemonData } = useBankData()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (!loading) {
      const groupedData = {}

      pokemonData.forEach((item) => {
        if (item.tags && item.tags.length > 0) {
          const key = `${item.desc}-${item.tags[0].name}`

          if (!groupedData[key]) {
            groupedData[key] = {
              desc: item.desc,
              tagName: item.tags[0].name,
              uangCash: 0,
              uangPiutang: 0,
              transDateCash: null,
              transDatePiutang: null,
            }
          }

          if (
            !groupedData[key].transDateCash ||
            groupedData[key].transDateCash > item.trans_date
          ) {
            groupedData[key].uangCash += item.amount_after_tax
            groupedData[key].transDateCash = item.trans_date
          } else {
            groupedData[key].uangPiutang += item.amount_after_tax
            if (
              !groupedData[key].transDatePiutang ||
              groupedData[key].transDatePiutang > item.trans_date
            ) {
              groupedData[key].transDatePiutang = item.trans_date
            }
          }
        }
      })

      const tableDataArray = Object.values(groupedData)
      setTableData(tableDataArray)
    }
  }, [loading, pokemonData])

  const columns = [
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Nama Tag',
      dataIndex: 'tagName',
      key: 'tagName',
    },
    {
      title: 'Uang Cash',
      dataIndex: 'uangCash',
      key: 'uangCash',
    },
    {
      title: 'Uang Piutang',
      dataIndex: 'uangPiutang',
      key: 'uangPiutang',
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={tableData} loading={loading} />
    </>
  )
}

export default BankDataTable
