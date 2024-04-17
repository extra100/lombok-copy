const filteredData = invoiceData.filter((item: Invoice) => {
  const startDate =
    dateRange && dateRange[0] ? formatedDate(dateRange[1]) : null
  const endDate = dateRange && dateRange[1] ? formatedDate(dateRange[1]) : null

  const isDateMatching =
    (!startDate || moment(item.trans_date).isSameOrBefore(startDate, 'day')) &&
    (!endDate || moment(item.trans_date).isSameOrAfter(endDate, 'day'))

  const isWhMatching =
    selectedWh.length === 0 || selectedWh.includes(item.warehouse.name)

  return isDateMatching && isDateMatch
})
