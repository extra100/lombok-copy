import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { BankTransaction } from '../pages/banks/UseBankData'

export const useGetBankTransaksiQuery = () =>
  useQuery(['bankTransaksi'], async () => {
    const response = await apiClient.get<BankTransaction[]>(
      '/api/bankTransaksi'
    )
    return response.data
  })

export const useAddBankTransMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (regak: BankTransaction) =>
      apiClient.post<BankTransaction>('/api/bankTransaksi', regak),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bankTransaksi'])
      },
    }
  )
}
