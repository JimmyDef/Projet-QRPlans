import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui-shadcn/dropdown-menu'

import React, { ReactNode } from 'react'

interface DropdownFolderOptionsProps {
  children: ReactNode
}

export const DropdownFolderOptions: React.FC<DropdownFolderOptionsProps> = ({
  children,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Renommer</DropdownMenuItem>

        <DropdownMenuItem>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
