import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="name">
          Name
        </Label>
        <Skeleton className="h-8 w-[340px]" />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="email">
          E-mail
        </Label>
        <Skeleton className="h-8 w-[340px]" />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="phone">
          Phone
        </Label>
        <Skeleton className="h-8 w-[340px]" />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="address">
          Address
        </Label>
        <Skeleton className="h-8 w-[340px]" />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="city">
          City
        </Label>
        <Skeleton className="h-8 w-[340px]" />
      </div>
    </div>
  )
}
