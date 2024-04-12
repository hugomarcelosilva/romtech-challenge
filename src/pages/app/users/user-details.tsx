import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getUserDetails } from '@/api/get-user-details'
import { GetUsersResponse } from '@/api/get-users'
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
  usersQueryKey: (
    | string
    | number
    | {
        field: string
        direction: string
      }
    | null
  )[]
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

export function UserDetails({
  id,
  open,
  usersQueryKey,
  closeDialog,
}: UserDetailsProps) {
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserDetails({ id }),
    enabled: open,
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateUser,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: usersQueryKey })
      const previousUsers = queryClient.getQueryData(usersQueryKey)

      if (previousUsers) {
        queryClient.setQueryData<GetUsersResponse[]>(usersQueryKey, (old) => {
          return old?.map((user) =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
          )
        })
      }
      return { previousUsers }
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(usersQueryKey, context.previousUsers)
      }
    },
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

      queryClient.invalidateQueries({
        queryKey: ['users'],
        refetchType: 'inactive',
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

      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="flex flex-col justify-between"
      >
        {user ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                className="col-span-3 border border-input text-foreground focus:ring-2 focus:ring-ring"
                id="name"
                {...register('name')}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="email">E-mail</Label>
              <Input
                className="col-span-3 border border-input text-foreground focus:ring-2 focus:ring-ring"
                id="email"
                {...register('email')}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                className="col-span-4 border border-input text-foreground focus:ring-2 focus:ring-ring"
                id="phone"
                {...register('phone')}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="address">Address</Label>
              <Input
                className="col-span-4 border border-input text-foreground focus:ring-2 focus:ring-ring"
                id="address"
                {...register('address')}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="city">City</Label>
              <Input
                className="col-span-4 border border-input text-foreground focus:ring-2 focus:ring-ring"
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
