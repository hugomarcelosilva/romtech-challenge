import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getUsers } from '@/api/get-users'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { UserTableFilters } from './user-table-filters'
import { UserTableRow } from './user-table-row'
import { UserTableSkeleton } from './user-table-skeleton'

export function Users() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [tableWidth, setTableWidth] = useState<number | undefined>(undefined)

  const [sort, setSort] = useState({ field: 'name', direction: 'asc' })

  const id = searchParams.get('id')
  const name = searchParams.get('name')

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)

  const { data: result, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users', pageIndex, id, name, sort],
    queryFn: () =>
      getUsers({
        _page: pageIndex,
        q: name ?? id,
        _sort: sort.field,
        _order: sort.direction,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex))

      return state
    })
  }

  function handleSort(field: string) {
    const direction =
      sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    setSort({ field, direction })
    setSearchParams((state) => {
      state.set('sort', field)
      state.set('order', direction)
      return state
    })
  }

  return (
    <>
      <Helmet title="Users" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <div className="space-y-2.5">
          <UserTableFilters />

          <div
            className={`rounded-md border ${
              tableWidth && tableWidth > 0
                ? `w-[calc(100%-${tableWidth}rem)]`
                : 'w-full'
            }`}
          >
            <Table
              className={
                tableWidth && tableWidth > 0
                  ? `w-[calc(100%-${tableWidth}rem)]`
                  : 'w-full'
              }
            >
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px] bg-blue-300 "></TableHead>
                  <TableHead
                    className="w-[140px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('id')}
                  >
                    ID {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead
                    className="w-[120px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('name')}
                  >
                    Name {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead
                    className="w-[140px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('email')}
                  >
                    Email {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead
                    className="w-[140px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('phone')}
                  >
                    Phone {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead
                    className="w-[140px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('address')}
                  >
                    Address {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead
                    className="w-[140px] cursor-pointer bg-blue-300 text-white"
                    onClick={() => handleSort('city')}
                  >
                    City {sort.direction === 'asc' ? '↑' : '↓'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingUsers && <UserTableSkeleton />}

                {result &&
                  result.map((user) => {
                    return (
                      <UserTableRow
                        key={user.id}
                        user={user}
                        setTableWidth={setTableWidth}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={30}
              perPage={10}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
