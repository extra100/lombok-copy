import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'

function Pokemon() {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])

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

        const response = await fetch(`${HOST}/pos/cashlessPayments`, {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjdmMDI0YS01N2U4LTQ3MGItYWI3Yi1iMmMwZGE3OWU5ZDgiLCJqdGkiOiJmZGExY2E1Y2Y0MDVkOTYyNDkzNDNkZTAxMDc3ZDM3Mzk3ZDk3YTgwNDNhM2Q3OTQ1MzA4MGYzZDcyMWIxYzc2OGFkYjZhYzNlMWU3ZTFjNiIsImlhdCI6MTcxMDMwMDIzMi42MTQ0MDUsIm5iZiI6MTcxMDMwMDIzMi42MTQ0MDksImV4cCI6MTc0MTgzNjIzMi42MDcxMTcsInN1YiI6IjE5NDYyNyIsInNjb3BlcyI6W119.nD3rUjaQ-XaUPKUEx6mL8ycupEYTwOZRY0eyYuEj7jLWgDFUfZg9OOzjZ4pW8eRTdH23S0Cg9pmXBqEnSz5nsxme0D8pyq77y7Io6g7lcS-5dENMt17BP0Mh06j95hgEBnU6KmZsf0igvrM7XT5UZLPEVPTX5dPTnDwQbS78KVGdVqyrwNdANwUIwhrhB2KgqlffrjapNz_f796AkWaINa4O0-FMWoP4X4dlCxAm6i_wCDMVSmkreW-CXE32Q3GM1iuOZ2XV5397T8LklHYALs8evNAjbNHohfhzMm32MkJqdlWd9Kl15vQj1sS6b0ZANRYpljj_TXopGCeqJCpo-_ZFGU0DDcdNCt5-iNMvvOd20z3GTNk9P1a135Yt4HEPmiV6LMC9EocUTa-LLX7kCpPkOihlVKrEIp4IKRvh67vk0HVDcdc_L3Y5L0PmQlWWJv8Ejl3kW-O7SAc9aWYbOQjTEKFZqtrPwC0kkJoVRgb7MV3A0gQJAGrqkOHt0KfOmCK5EMszkdLEvOMCJNgVQ396a7OWf4YlXaQgRpvrKx535L1NlMMacmuziwv85tfcs0Y1a1qJUMXhxikeEQVGkV5Pdb1nMhzMto-UT3JCdwBDVLX9II5jQik8AkSC7DDTiZIV4I5Ss4MmCz8WTPVOwI6tf8zW1SUk1DxruLlCJdo`,
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()

        const formattedData = data.data.data.map((item: any, index: any) => ({
          key: index,
          name: item.name,
          pos_product_category_id: item.pos_product_category_id,
          code: item.code,
          description: item.description,
          is_purchase: item.is_purchase,
          purchase_account_id: item.purchase_account_id,
          purchase_tax_id: item.purchase_tax_id,
          base_price: item.base_price,
          is_sell: item.is_sell,
          sell_account_id: item.sell_account_id,
          sell_tax_id: item.sell_tax_id,
          price: item.price,
          wholesale_price: item.wholesale_price,
          is_track: item.is_track,
          track_account_id: item.track_account_id,
          photos: item.photos,
          unit_id: item.unit_id,
          custom_buffer_qty: item.custom_buffer_qty,
          buffer_qty: item.buffer_qty,
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Category ID',
      dataIndex: 'pos_product_category_id',
      key: 'pos_product_category_id',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Is Purchase',
      dataIndex: 'is_purchase',
      key: 'is_purchase',
    },
    {
      title: 'Purchase Account ID',
      dataIndex: 'purchase_account_id',
      key: 'purchase_account_id',
    },
    {
      title: 'Purchase Tax ID',
      dataIndex: 'purchase_tax_id',
      key: 'purchase_tax_id',
    },
    {
      title: 'Base Price',
      dataIndex: 'base_price',
      key: 'base_price',
    },
    {
      title: 'Is Sell',
      dataIndex: 'is_sell',
      key: 'is_sell',
    },
    {
      title: 'Sell Account ID',
      dataIndex: 'sell_account_id',
      key: 'sell_account_id',
    },
    {
      title: 'Sell Tax ID',
      dataIndex: 'sell_tax_id',
      key: 'sell_tax_id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Wholesale Price',
      dataIndex: 'wholesale_price',
      key: 'wholesale_price',
    },
    {
      title: 'Is Track',
      dataIndex: 'is_track',
      key: 'is_track',
    },
    {
      title: 'Track Account ID',
      dataIndex: 'track_account_id',
      key: 'track_account_id',
    },
    {
      title: 'Photos',
      dataIndex: 'photos',
      key: 'photos',
    },
    {
      title: 'Unit ID',
      dataIndex: 'unit_id',
      key: 'unit_id',
    },
    {
      title: 'Custom Buffer Quantity',
      dataIndex: 'custom_buffer_qty',
      key: 'custom_buffer_qty',
    },
    {
      title: 'Buffer Quantity',
      dataIndex: 'buffer_qty',
      key: 'buffer_qty',
    },
  ]

  return <Table columns={columns} dataSource={pokemonData} loading={loading} />
}

export default Pokemon
