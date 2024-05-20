import { useState, useEffect } from 'react'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'

interface Invoice {
  id: number
  trans_date: string
  status_id: number
  contact_id: number
  amount: number
  amount_after_tax: number
  memo: string
  desc: string
  ref_number: string | null
  balance: number
  business_tran_id: number | null
  trans_type_id: number
  additional_discount_amount: number
  currency_rate: number
  currency_id: number
  bank_account_id: string
  shipping_cost: number
  shipping_date: string | null
  contact: {
    id: number
    name: string
    email: string | null
    phone: string | null
    company: string | null
    address: string
    country_id: number
    province_id: number | null
    city_id: number | null
    group_id: number
    type_ids: number[]
    edit_address: string | null
    finance_contact_emails: string[]
  }
  items: {
    amount: number
    tran_id: string
    desc: string
  }
  tags: {
    id: number
    name: string
    color: string
  }[]
  valid: boolean
}

export const useFetchData = () => {
  const [loading, setLoading] = useState(true)
  const [bankTrans, setInvoiceData] = useState<Invoice[]>([])

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
          `${HOST}/finance/bankTrans?page=1&per_page=10000000`,
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
          id: item.id,
          trans_date: item.trans_date,
          status_id: item.status_id,
          contact_id: item.contact_id,
          amount: item.amount,
          amount_after_tax: item.amount_after_tax,
          memo: item.memo || '',
          ref_number: item.ref_number,
          balance: item.balance,
          business_tran_id: item.business_tran_id,
          trans_type_id: item.trans_type_id,
          additional_discount_amount: item.additional_discount_amount,
          currency_rate: item.currency_rate,
          currency_id: item.currency_id,
          shipping_cost: item.shipping_cost,
          shipping_date: item.shipping_date,
          bank_account_id: item.bank_account_id,
          desc: item.desc,
          contact: item.contact
            ? {
                id: item.contact.id,
                name: item.contact.name,
                email: item.contact.email,
                phone: item.contact.phone,
                company: item.contact.company,
                address: item.contact.address,
                country_id: item.contact.country_id,
                province_id: item.contact.province_id,
                city_id: item.contact.city_id,
                group_id: item.contact.group_id,
                type_ids: item.contact.type_ids,
                edit_address: item.contact.edit_address,
                finance_contact_emails: item.contact.finance_contact_emails,
              }
            : null,
          items: item.contact
            ? {
                amount: item.contact.amount,
                tran_id: item.contact.tran_id,
                desc: item.contact.desc,
              }
            : null,

          tags: item.tags.map((tag: any) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })),
          valid: item.valid,
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

  return { loading, bankTrans }
}
