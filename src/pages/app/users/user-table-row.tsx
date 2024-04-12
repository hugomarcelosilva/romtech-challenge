import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { UserDetails } from './user-details'

interface UserTableRowProps {
  user: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    city: string
  }
  usersQueryKey: (
    | string
    | number
    | {
        field: string
        direction: string
      }
    | null
  )[]
  setTableWidth: (width: number | undefined) => void
}

export function UserTableRow({
  user,
  usersQueryKey,
  setTableWidth,
}: UserTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    if (isDetailsOpen) {
      setTableWidth(10)
    } else {
      setTableWidth(undefined)
    }
  }, [isDetailsOpen, setTableWidth])

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">User details</span>
            </Button>
          </DialogTrigger>

          <UserDetails
            open={isDetailsOpen}
            id={user.id}
            usersQueryKey={usersQueryKey}
            closeDialog={() => setIsDetailsOpen(false)}
          />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{user.id}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="font-medium">{user.email}</TableCell>
      <TableCell className="font-medium">{user.phone}</TableCell>
      <TableCell className="font-medium">{user.address}</TableCell>
      <TableCell className="font-medium">{user.city}</TableCell>
    </TableRow>
  )
}
