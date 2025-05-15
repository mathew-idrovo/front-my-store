import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  title: string
  describe: string
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function Modal({
  children,
  title,
  open,
  describe,
  onOpenChange,
}: ModalProps) {
  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{describe}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
