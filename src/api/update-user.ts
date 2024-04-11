import { api } from '@/lib/axios'

export interface UpdateUserBody {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export async function updateUser({
  id,
  name,
  email,
  phone,
  address,
  city,
}: UpdateUserBody) {
  await api.put(`users/${id}`, { name, email, phone, address, city })
}
