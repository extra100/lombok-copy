const aaaa = [1, 2, 3, 4, 5]
const total = aaaa.reduce((acc: any, currentValue: any) => {
  return acc + currentValue
}, [])
console.log({ total })

const database = invoiceData.reduce((acc: any, currentValue: any) => {
  return acc + currentValue.amount_after_tax
}, [])
console.log({ database })

const filteredData = pokemonData.filter((item) =>
  item.name.toLowerCase().includes(searchText.toLowerCase())
)

// const filteredData = pokemonData.filter((item) =>
//   item.name.toLowerCase().includes(searchText.toLowerCase())
// )
// const filteredData = pokemonData.filter(
//   (item) =>
//     item.name.toLowerCase().includes(searchText.toLowerCase()) &&
//     !item.name.toLowerCase().includes('kas kecil')
// )
