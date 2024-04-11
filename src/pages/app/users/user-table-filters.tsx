import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const userFiltersSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
})

type UsersFiltersSchema = z.infer<typeof userFiltersSchema>

export function UserTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')

  const { register, handleSubmit, reset } = useForm<UsersFiltersSchema>({
    resolver: zodResolver(userFiltersSchema),
    defaultValues: {
      id: id ?? '',
      name: name ?? '',
    },
  })

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('id')
      state.delete('name')
      state.set('page', '1')

      return state
    })

    reset({
      id: '',
      name: '',
    })
  }

  function handleFilter({ id, name }: UsersFiltersSchema) {
    setSearchParams((state) => {
      if (id) {
        state.set('id', id)
      } else {
        state.delete('id')
      }

      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      state.set('page', '1')

      return state
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filters:</span>
      <Input placeholder="User ID" className="h-8 w-auto" {...register('id')} />

      <Input
        placeholder="User name"
        className="h-8 w-[320px]"
        {...register('name')}
      />

      <Button
        className="text-white bg-blue-500 hover:bg-blue-700"
        type="submit"
        size="xs"
      >
        <Search className="mr-2 h-4 w-4" />
        Filter
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remove filters
      </Button>
    </form>
  )
}
