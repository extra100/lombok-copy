import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'
import { useFetchData } from '../fetch/Fetch'
interface BankTransaction {
id: number
trans_date: string
status_id: number
contact_id: number
amount: number
amount_after_tax: number
balance: number
trans_type_id: number

contact: {
id: number
name: string
}
tags: {
id: number
name: string
}[]
}

function Banks() {
const [loading, setLoading] = useState(true)
const [pokemonData, setPokemonData] = useState<BankTransaction[]>([])
const { invoiceData } = useFetchData()

console.log({ pokemonData })
const [contactSearchText, setContactSearchText] = useState('')

useEffect(() => {
const fetchAccessToken = async () => {
const response = await fetch(`${HOST}/oauth/token`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
client_id: CLIENT_ID,
client_secret: CLIENT_SECRET,
grant_type: 'client_credentials',
}),
})

      const data = await response.json()

      return data.access_token
    }

    const fetchData = async () => {
      try {
        const accessToken = await fetchAccessToken()

        const response = await fetch(
          `${HOST}/finance/bankTrans?page=1&per_page=10000000000000`,
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjdmMDI0YS01N2U4LTQ3MGItYWI3Yi1iMmMwZGE3OWU5ZDgiLCJqdGkiOiIwZDVjZWRlMGRmOTA1MmYwYjE4M2U1MjBjMDkwN2QwZjc5Nzc1NDJhYzdkYjY4NDZkNjY3NWJhMTFjNTFmNzRjZjViOGRkYjQwOTJjZmRlZSIsImlhdCI6MTcxMDc4MjUwNS41Mjg0NjgsIm5iZiI6MTcxMDc4MjUwNS41Mjg0NzEsImV4cCI6MTc0MjMxODUwNS41MTY5NjksInN1YiI6IjE5NDYyNyIsInNjb3BlcyI6W119.TI2y8gFarEQ7_Y3JIOdEIZCs_uEeMjHZFhJ8NWecDz-anMsoGBsTQjo2IH0YIJKpIeCLrWOLfto9MFNf5dUn-YovjcZRpsjLOAuXpTQ6mFATD2NX1yvDAlpr3GtoRE928OpWCdiNcEuhE-AXxmk_FrQxlRremdq2HcjzBDP_F4o3MzNzrh2JVdv7Ui4Q8cGRm2j2pFznNsn1uIYvvTYZN7QjMJxDwv8S6GpAYg01PiwKixVtXcRczax4sG9gVewVrtRo3MpZONNTfM2h1i7qi8rwjW1jSgNuY5afuTUAAMi9TpNenXX4GlXpgqUNjC8L79n6AhMoXEtWW9AJQQ7sHa9gMYs83W1gnVWHJKCj48Wak8K95L6fxxiw9_lcFZiQCHIlRzt_NyC5yR9o25mnf1SdDIEvhwWSgw3OvBzjHDC9dstMmlN-8g19tn4mWP0L1KMM5n4Qh0v2nacxgGfbjzcNPTaxhP29zgkxuIdh2oyzyhPugYys7S3sgtM2zahHdsBA9X452CvD6W14vY-ywvCWEIhAuzlQYsZdPqJddyz2_XJOhXxFiMfw9VfjRIExDb8oDKs08vT3hwFvHUqtIXevtv9Ch3buKdW8WDphHC8V6D3LdUR-0_yPMwyVeKISAwNND2ZOPqMdMS9fsJHIgvjLUqVnbP4mcI0uX_r3DX4`,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log({ data })
        const formattedData: BankTransaction[] = data.data.data.map(
          (item: BankTransaction) => ({
            id: item.id,
            trans_date: item.trans_date,
            status_id: item.status_id,
            contact_id: item.contact_id,
            amount: item.amount,
            amount_after_tax: item.amount_after_tax,
            balance: item.balance,
            trans_type_id: item.trans_type_id,
            contact: {
              id: item.contact ? item.contact.id : null,
              name: item.contact ? item.contact.name : null,
            },
            tags: item.tags,
            type: item.amount_after_tax >= 0 ? 'Uang Masuk' : 'Hutang',
          })
        )
        setPokemonData(formattedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()

}, [])

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

const sortedData = filteredData.sort((a, b: any) => {
const dateA = new Date(a.trans_date).getTime()
const dateB = new Date(b.trans_date).getTime()

    return dateA - dateB

})

const firstTransactionDate = sortedData[sortedData.length - 1]?.trans_date
const firstTransactions = sortedData.filter(
(item) => item.trans_date === firstTransactionDate
)
console.log({ firstTransactionDate })
const debtTransactions = sortedData.filter(
(item) =>
item.trans_date !== firstTransactionDate && item.amount_after_tax > 0
)
console.log({ debtTransactions })

const combinedTransactions = [
...firstTransactions.map((transaction) => ({
...transaction,
type: 'Uang Masuk',
})),
...debtTransactions.map((transaction) => ({
...transaction,
type: 'Uang Hutang',
})),
]

const columns = [
{
title: 'ID Kontak',
dataIndex: 'contact_id',
key: 'contact_id',
},
{
title: 'Status ID',
dataIndex: 'status_id',
key: 'status_id',
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
title: 'Jenis Transaksi',
dataIndex: 'type',
key: 'type',
},
{
title: 'Uang Masuk',
dataIndex: 'amount_after_tax',
key: 'amount_masuk',
render: (amount_after_tax: number, record: BankTransaction) => {
if (record.type === 'Uang Masuk') {
return amount_after_tax.toLocaleString()
}
return null // Return null jika jenis transaksi bukan "Uang Masuk"
},
},
{
title: 'Hutang',
dataIndex: 'amount_after_tax',
key: 'amount_hutang',
render: (amount_after_tax: number, record: BankTransaction) => {
if (record.type === 'Uang Hutang') {
return amount_after_tax.toLocaleString()
}
return null // Return null jika jenis transaksi bukan "Uang Hutang"
},
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
