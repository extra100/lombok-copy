import { useState, useEffect } from 'react'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'

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

export const useFetchExpense = () => {
  const [loading, setLoading] = useState(true)
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessTokenResponse = await fetch(`${HOST}/oauth/token`, {
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

        if (!accessTokenResponse.ok) {
          throw new Error('Failed to fetch access token')
        }

        const { access_token } = await accessTokenResponse.json()

        const invoicesResponse = await fetch(
          `${HOST}/finance/expenses?page=1&per_page=1000000000`,
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjdmMDI0YS01N2U4LTQ3MGItYWI3Yi1iMmMwZGE3OWU5ZDgiLCJqdGkiOiIwZDVjZWRlMGRmOTA1MmYwYjE4M2U1MjBjMDkwN2QwZjc5Nzc1NDJhYzdkYjY4NDZkNjY3NWJhMTFjNTFmNzRjZjViOGRkYjQwOTJjZmRlZSIsImlhdCI6MTcxMDc4MjUwNS41Mjg0NjgsIm5iZiI6MTcxMDc4MjUwNS41Mjg0NzEsImV4cCI6MTc0MjMxODUwNS41MTY5NjksInN1YiI6IjE5NDYyNyIsInNjb3BlcyI6W119.TI2y8gFarEQ7_Y3JIOdEIZCs_uEeMjHZFhJ8NWecDz-anMsoGBsTQjo2IH0YIJKpIeCLrWOLfto9MFNf5dUn-YovjcZRpsjLOAuXpTQ6mFATD2NX1yvDAlpr3GtoRE928OpWCdiNcEuhE-AXxmk_FrQxlRremdq2HcjzBDP_F4o3MzNzrh2JVdv7Ui4Q8cGRm2j2pFznNsn1uIYvvTYZN7QjMJxDwv8S6GpAYg01PiwKixVtXcRczax4sG9gVewVrtRo3MpZONNTfM2h1i7qi8rwjW1jSgNuY5afuTUAAMi9TpNenXX4GlXpgqUNjC8L79n6AhMoXEtWW9AJQQ7sHa9gMYs83W1gnVWHJKCj48Wak8K95L6fxxiw9_lcFZiQCHIlRzt_NyC5yR9o25mnf1SdDIEvhwWSgw3OvBzjHDC9dstMmlN-8g19tn4mWP0L1KMM5n4Qh0v2nacxgGfbjzcNPTaxhP29zgkxuIdh2oyzyhPugYys7S3sgtM2zahHdsBA9X452CvD6W14vY-ywvCWEIhAuzlQYsZdPqJddyz2_XJOhXxFiMfw9VfjRIExDb8oDKs08vT3hwFvHUqtIXevtv9Ch3buKdW8WDphHC8V6D3LdUR-0_yPMwyVeKISAwNND2ZOPqMdMS9fsJHIgvjLUqVnbP4mcI0uX_r3DX4`,
            },
          }
        )

        if (!invoicesResponse.ok) {
          throw new Error('Failed to fetch invoices')
        }

        const { data } = await invoicesResponse.json()
        console.log({ data })
        const formattedData: Invoice[] = data.data.map((item: any) => ({
          key: item.id,
          contact_id: item.contact_id,
          due: item.due,
          tags: item.tags,
          contact_groups: item.contact_groups,
          trans_date: item.trans_date,
          amount_after_tax: item.amount_after_tax,
          ref_number: item.ref_number,
          paid_date: item.paid_date,
          product_id: item.product_id,
        }))

        setInvoiceData(formattedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { loading, invoiceData }
}
