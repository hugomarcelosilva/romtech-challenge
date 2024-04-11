import { api } from '@/lib/axios'

export interface GetUserDetailsParams {
  id: string
}

export interface GetUserDetailsResponse {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export async function getUserDetails({ id }: GetUserDetailsParams) {
  const response = await api.get<GetUserDetailsResponse>(`/users/${id}`)

  return response.data
}
