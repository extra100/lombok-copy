import React, { useState } from 'react'
import { Table, Input } from 'antd'
import { BankTransaction, useBankData } from './UseBankData'

function Banks() {
const { loading, pokemonData } = useBankData()

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

// Group transactions by description
const groupedTransactions: { [key: string]: BankTransaction[] } = {}
filteredData.forEach((transaction) => {
if (!groupedTransactions[transaction.desc]) {
groupedTransactions[transaction.desc] = []
}
groupedTransactions[transaction.desc].push(transaction)
})

const combinedTransactions: BankTransaction[] = []
for (const key in groupedTransactions) {
const transactions = groupedTransactions[key]
const sortedTransactions = transactions.sort((a, b) => {
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
amount_masuk: uangMasuk,
amount_hutang: hutang,
})
}

const columns = [
{
title: 'Deskripsi',
dataIndex: 'desc',
key: 'desc',
// render: (desc: string) => {
// const words = desc.split(' ')
// return words[words.length - 1]
// },
},

    {
      title: 'Nama Kontak',
      dataIndex: ['contact', 'name'],
      key: 'contact_name',
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
      dataIndex: 'amount_masuk',
      key: 'amount_masuk',
      render: (amount_masuk: number) => amount_masuk.toLocaleString(),
    },
    {
      title: 'Hutang',
      dataIndex: 'amount_hutang',
      key: 'amount_hutang',
      render: (amount_hutang: number) => amount_hutang.toLocaleString(),
    },
    {
      title: 'Tanggal',
      dataIndex: 'trans_date',
      key: 'trans_date',
    },

]

return (
<>
<Input
placeholder="Pilih Nama Kontak"
style={{ marginBottom: 16 }}
onChange={handleContactSearch}
/>

<Table
        columns={columns}
        dataSource={combinedTransactions}
        loading={loading}
      />
</>
)
}

export default Banks
