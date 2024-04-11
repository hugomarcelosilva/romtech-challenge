import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getUserDetails } from '@/api/get-user-details'
import { updateUser } from '@/api/update-user'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { UserDetailsSkeleton } from './user-details-skeleton'

export interface UserDetailsProps {
  id: string
  open: boolean
  closeDialog: () => void
}

const storeUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
})

type StoreUserSchema = z.infer<typeof storeUserSchema>

export function UserDetails({ id, open, closeDialog }: UserDetailsProps) {
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserDetails({ id }),
    enabled: open,
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateUser,
  })

  async function handleUpdateProfile(data: StoreUserSchema) {
    try {
      await updateProfileFn({
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
      })

      toast.success('User updated!')
      closeDialog()
    } catch {
      toast.error('Error on updating the user, try again.')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreUserSchema>({
    resolver: zodResolver(storeUserSchema),
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? '',
      city: user?.city ?? '',
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>User details</DialogTitle>
        <DialogDescription>Update the user details</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        {user ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input
                className="col-span-3 bg-input text-foreground border border-input focus:ring-2 focus:ring-ring"
                id="name"
                {...register('name')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                E-mail
              </Label>
              <Input
                className="col-span-3 bg-input text-foreground border border-input focus:ring-2 focus:ring-ring"
                id="email"
                {...register('email')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="phone">
                Phone
              </Label>
              <Input
                className="col-span-3 bg-input text-foreground border border-input focus:ring-2 focus:ring-ring"
                id="phone"
                {...register('phone')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="address">
                Address
              </Label>
              <Input
                className="col-span-3 bg-input text-foreground border border-input focus:ring-2 focus:ring-ring"
                id="address"
                {...register('address')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="city">
                City
              </Label>
              <Input
                className="col-span-3 bg-input text-foreground border border-input focus:ring-2 focus:ring-ring"
                id="city"
                {...register('city')}
              />
            </div>
          </div>
        ) : (
          <UserDetailsSkeleton />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={!user || isSubmitting}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
