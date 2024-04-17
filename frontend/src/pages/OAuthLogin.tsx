// // frontend/src/OAuthLogin.tsx
// import React, { useEffect, useState } from 'react'
// import { CLIENT_ID, CLIENT_SECRET, HOST, REDIRECT_URI } from '../config'

// interface Tag {
//   id: number
//   name: string
//   color: string | null
//   purchase_trans_count: number
//   sale_trans_count: number
//   expense_trans_count: number
//   fixed_asset_trans_count: number
//   other_trans_count: number
// }

// interface ApiResponse {
//   success: boolean
//   data: {
//     data: Tag[]
//   }
// }

// const OAuthLogin: React.FC = () => {
//   const [tags, setTags] = useState<Tag[]>([])

//   useEffect(() => {
//     const handleAuthentication = async () => {
//       try {
//         const response = await fetch(`${HOST}/banks`)

//         const data: ApiResponse = await response.json()
//         console.log(data)

//         if (data && data.success && data.data && data.data.data) {
//           setTags(data.data.data)
//         } else {
//           console.error('Invalid API response:', data)
//         }
//       } catch (error) {
//         console.error('Error during authentication:', error)
//       }
//     }

//     handleAuthentication()
//   }, [])

//   return (
//     <div>
//       <h1>Tags</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nama Tag</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tags.map((tag) => (
//             <tr key={tag.id}>
//               <td>{tag.id}</td>
//               <td>{tag.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default OAuthLogin
