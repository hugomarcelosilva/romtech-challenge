import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="name">Name</Label>
        <Skeleton className="col-span-3 h-10 w-full" />
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="email">E-mail</Label>
        <Skeleton className="col-span-3 h-10 w-full" />
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="phone">Phone</Label>
        <Skeleton className="col-span-3 h-10 w-full" />
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="address">Address</Label>
        <Skeleton className="col-span-3 h-10 w-full" />
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="city">City</Label>
        <Skeleton className="col-span-3 h-10 w-full" />
      </div>
    </div>
  )
}
