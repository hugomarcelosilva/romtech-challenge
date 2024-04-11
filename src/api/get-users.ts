import { api } from '@/lib/axios'

export interface GetUsersQuery {
  _page?: number | null
  id?: string | null
  q?: string | null
  _sort?: string | null
  _order?: string | null
}

export interface GetUsersResponse {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export async function getUsers({ _page, id, q, _sort, _order }: GetUsersQuery) {
  const response = await api.get<GetUsersResponse[]>('/users', {
    params: {
      _page,
      id,
      q,
      _sort,
      _order,
    },
  })

  return response.data
}
