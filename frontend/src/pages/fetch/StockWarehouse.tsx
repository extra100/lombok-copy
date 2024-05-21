import { useState, useEffect, useMemo } from 'react'
import { CLIENT_ID, CLIENT_SECRET, HOST } from '../../config'

const useFetchDataKey = () => {
  const [warehouseData, setWarehouseData] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('warehouseData')
        if (cachedData) {
          setWarehouseData(JSON.parse(cachedData))
          setIsDataLoaded(true)
          return
        }

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

        const outletIds = [
          2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]

        const promises = outletIds.map(async (outletId) => {
          const warehousesResponse = await fetch(
            `${HOST}/finance/warehouses/${outletId}?per_page=20000`,
            {
              headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjdmMDI0YS01N2U4LTQ3MGItYWI3Yi1iMmMwZGE3OWU5ZDgiLCJqdGkiOiIwZDVjZWRlMGRmOTA1MmYwYjE4M2U1MjBjMDkwN2QwZjc5Nzc1NDJhYzdkYjY4NDZkNjY3NWJhMTFjNTFmNzRjZjViOGRkYjQwOTJjZmRlZSIsImlhdCI6MTcxMDc4MjUwNS41Mjg0NjgsIm5iZiI6MTcxMDc4MjUwNS41Mjg0NzEsImV4cCI6MTc0MjMxODUwNS41MTY5NjksInN1YiI6IjE5NDYyNyIsInNjb3BlcyI6W119.TI2y8gFarEQ7_Y3JIOdEIZCs_uEeMjHZFhJ8NWecDz-anMsoGBsTQjo2IH0YIJKpIeCLrWOLfto9MFNf5dUn-YovjcZRpsjLOAuXpTQ6mFATD2NX1yvDAlpr3GtoRE928OpWCdiNcEuhE-AXxmk_FrQxlRremdq2HcjzBDP_F4o3MzNzrh2JVdv7Ui4Q8cGRm2j2pFznNsn1uIYvvTYZN7QjMJxDwv8S6GpAYg01PiwKixVtXcRczax4sG9gVewVrtRo3MpZONNTfM2h1i7qi8rwjW1jSgNuY5afuTUAAMi9TpNenXX4GlXpgqUNjC8L79n6AhMoXEtWW9AJQQ7sHa9gMYs83W1gnVWHJKCj48Wak8K95L6fxxiw9_lcFZiQCHIlRzt_NyC5yR9o25mnf1SdDIEvhwWSgw3OvBzjHDC9dstMmlN-8g19tn4mWP0L1KMM5n4Qh0v2nacxgGfbjzcNPTaxhP29zgkxuIdh2oyzyhPugYys7S3sgtM2zahHdsBA9X452CvD6W14vY-ywvCWEIhAuzlQYsZdPqJddyz2_XJOhXxFiMfw9VfjRIExDb8oDKs08vT3hwFvHUqtIXevtv9Ch3buKdW8WDphHC8V6D3LdUR-0_yPMwyVeKISAwNND2ZOPqMdMS9fsJHIgvjLUqVnbP4mcI0uX_r3DX4`,
              },
            }
          )

          if (!warehousesResponse.ok) {
            throw new Error('Failed to fetch warehouse data')
          }

          const { data } = await warehousesResponse.json()
          return data.products.data.map((product: any) => ({
            productName: product.name,
            outletId,
            qty: product.qty,
          }))
        })

        const results = await Promise.all(promises)
        const mergedData = results.flat()
        const uniqueProductNames = Array.from(
          new Set(mergedData.map((item) => item.productName))
        )

        const finalData = uniqueProductNames.map((productName) => {
          const productData = mergedData.filter(
            (item) => item.productName === productName
          )
          const outletQuantities: Record<string, number> = {}
          productData.forEach((item) => {
            outletQuantities[`outlet-${item.outletId}`] = item.qty
          })
          return {
            productName,
            ...outletQuantities,
          }
        })

        setWarehouseData(finalData as any)
        localStorage.setItem('warehouseData', JSON.stringify(finalData))
        setIsDataLoaded(true)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsDataLoaded(true)
      }
    }

    fetchData()
  }, [])

  const memoizedWarehouseData = useMemo(() => warehouseData, [warehouseData])

  return { isDataLoaded, warehouseData: memoizedWarehouseData }
}

export default useFetchDataKey
