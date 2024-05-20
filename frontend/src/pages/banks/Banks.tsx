import React, { useState } from 'react'
import { Table, Input, Button } from 'antd'
import { BankTransaction, useBankData } from './UseBankData'
import {
  useAddBankTransMutation,
  useGetBankTransaksiQuery,
} from '../../hooks/bankTransHooks'

function Banks() {
  const { loading, pokemonData } = useBankData()
  const addBankTransMutation = useAddBankTransMutation()
  const getBankdata = useGetBankTransaksiQuery()
  console.log({ getBankdata })
  const [contactSearchText, setContactSearchText] = useState('')

  const handleContactSearch = (e: any) => {
    setContactSearchText(e.target.value.toLowerCase())
  }

  const filteredData = pokemonData.filter(
    (item) =>
      !item.tags.some((tag) => tag.name.toLowerCase() === 'saldo awal') &&
      item.contact &&
      item.contact.name &&
      item.contact.name.toLowerCase().includes(contactSearchText)
  )

  const groupedTransactions: { [key: string]: BankTransaction[] } = {}
  filteredData.forEach((transaction) => {
    if (!groupedTransactions[transaction.desc]) {
      groupedTransactions[transaction.desc] = []
    }
    groupedTransactions[transaction.desc].push(transaction)
  })
  const [dataSource, setDataSource] = useState([])

  const combinedTransactions: BankTransaction[] = []
  for (const key in groupedTransactions) {
    const transactions = groupedTransactions[key]
    const sortedTransactions = transactions.sort((a: any, b: any) => {
      const dateA = new Date(a.trans_date).getTime()
      const dateB = new Date(b.trans_date).getTime()
      return dateA - dateB
    })
    const firstTransaction = sortedTransactions[0]
    const uangMasuk = firstTransaction.amount_after_tax
    const hutang = sortedTransactions
      .slice(1)
      .reduce((total, transaction) => total + transaction.amount_after_tax, 0)
    combinedTransactions.push({
      ...firstTransaction,
      amount_after_tax: uangMasuk,
      amount: hutang,
    })
  }

  const handleSave = () => {
    const dataToSave = combinedTransactions.map((row: any) => ({
      desc: row.desc,
      tags: row.tags.map((tag: any) => tag.name).join(', '),
      amount_after_tax: row.amount_after_tax,
      amount: row.amount,
    }))

    addBankTransMutation.mutate(dataToSave as any)
  }

  const columns = [
    {
      title: 'Deskripsi',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Nama Tag',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: { id: number; name: string }[]) =>
        tags.map((tag) => tag.name).join(', '),
    },
    {
      title: 'Uang Masuk',
      dataIndex: 'amount_after_tax',
      key: 'amount_after_tax',
      render: (amount_after_tax: number) => amount_after_tax.toLocaleString(),
    },
    {
      title: 'Pembayaran Piutang',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount.toLocaleString(),
    },
  ]

  return (
    <>
      <Input
        placeholder="Pilih Nama Kontak"
        style={{ marginBottom: 16 }}
        onChange={handleContactSearch}
      />
      <Button type="primary" onClick={handleSave} style={{ marginBottom: 16 }}>
        Simpan
      </Button>
      <Table
        columns={columns}
        dataSource={combinedTransactions}
        loading={loading}
      />
    </>
  )
}

export default Banks
