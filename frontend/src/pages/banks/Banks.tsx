import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'
interface PokemonData {
  key: string
  name: string
  balance: number
  currency_id: string
  finance_account_category_id: string
  id: string
  ref_code: string
}
function Banks() {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([])

  const [searchText, setSearchText] = useState('')

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

        const response = await fetch(`${HOST}/finance/bank/balances`, {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjdmMDI0YS01N2U4LTQ3MGItYWI3Yi1iMmMwZGE3OWU5ZDgiLCJqdGkiOiIwZDVjZWRlMGRmOTA1MmYwYjE4M2U1MjBjMDkwN2QwZjc5Nzc1NDJhYzdkYjY4NDZkNjY3NWJhMTFjNTFmNzRjZjViOGRkYjQwOTJjZmRlZSIsImlhdCI6MTcxMDc4MjUwNS41Mjg0NjgsIm5iZiI6MTcxMDc4MjUwNS41Mjg0NzEsImV4cCI6MTc0MjMxODUwNS41MTY5NjksInN1YiI6IjE5NDYyNyIsInNjb3BlcyI6W119.TI2y8gFarEQ7_Y3JIOdEIZCs_uEeMjHZFhJ8NWecDz-anMsoGBsTQjo2IH0YIJKpIeCLrWOLfto9MFNf5dUn-YovjcZRpsjLOAuXpTQ6mFATD2NX1yvDAlpr3GtoRE928OpWCdiNcEuhE-AXxmk_FrQxlRremdq2HcjzBDP_F4o3MzNzrh2JVdv7Ui4Q8cGRm2j2pFznNsn1uIYvvTYZN7QjMJxDwv8S6GpAYg01PiwKixVtXcRczax4sG9gVewVrtRo3MpZONNTfM2h1i7qi8rwjW1jSgNuY5afuTUAAMi9TpNenXX4GlXpgqUNjC8L79n6AhMoXEtWW9AJQQ7sHa9gMYs83W1gnVWHJKCj48Wak8K95L6fxxiw9_lcFZiQCHIlRzt_NyC5yR9o25mnf1SdDIEvhwWSgw3OvBzjHDC9dstMmlN-8g19tn4mWP0L1KMM5n4Qh0v2nacxgGfbjzcNPTaxhP29zgkxuIdh2oyzyhPugYys7S3sgtM2zahHdsBA9X452CvD6W14vY-ywvCWEIhAuzlQYsZdPqJddyz2_XJOhXxFiMfw9VfjRIExDb8oDKs08vT3hwFvHUqtIXevtv9Ch3buKdW8WDphHC8V6D3LdUR-0_yPMwyVeKISAwNND2ZOPqMdMS9fsJHIgvjLUqVnbP4mcI0uX_r3DX4`,
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()

        const formattedData = data.data.map((item: any) => ({
          key: item.id,
          name: item.name,
          balance: item.balance,
          currency_id: item.currency_id,
          finance_account_category_id: item.finance_account_category_id,
          id: item.id,
          ref_code: item.ref_code,
        }))

        setPokemonData(formattedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
  }

  const filteredData = pokemonData.filter((item) =>
    item.name.toLowerCase().includes('kas penjualan')
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: any) => balance.toLocaleString(),
    },

    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
  ]

  return (
    <>
      <Input
        placeholder="Pilih Kas & Bank"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredData} loading={loading} />
    </>
  )
}

export default Banks
