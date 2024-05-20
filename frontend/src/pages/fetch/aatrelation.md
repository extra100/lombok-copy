import React, { useState } from 'react'
import { Table, Input } from 'antd'
import { useFetchData } from './fetch/FetchFIid'

interface Relation {
id: number
amount_after_tax: number
}

interface InvoiceData {
id: number
warehouse_id: any
ref_number: any
relations: Relation[] | null
}

const Aat: React.FC = () => {
const { loading, invoiceData = [] } = useFetchData()
console.log({ invoiceData })
const [searchId, setSearchId] = useState<number | undefined>()

const handleSearch = (value: string) => {
const id = parseInt(value)
if (!isNaN(id)) {
setSearchId(id)
} else {
setSearchId(undefined)
}
}
//
const columns = [
{
title: 'Warehouse ID',
dataIndex: 'warehouse_id',
key: 'warehouse_id',
},
{
title: 'Total Amount After Tax',
dataIndex: 'total_amount_after_tax',
key: 'total_amount_after_tax',
render: (_: any, record: InvoiceData) =>
record.relations?.reduce(
(acc, relation) => acc + relation.amount_after_tax,
0
),
},
{
title: 'ref no',
dataIndex: 'ref_number',
key: 'ref_number',
},
{
title: 'Id',
dataIndex: 'id',
key: 'id',
},
]
//
const filteredData = searchId
? invoiceData?.filter((item: InvoiceData) => item.id === searchId)
: invoiceData

return (
<div>
<Input.Search
placeholder="Search by ID"
onSearch={handleSearch}
style={{ width: 200, marginBottom: 16 }}
enterButton
/>
<Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />
</div>
)
}

export default Aat
