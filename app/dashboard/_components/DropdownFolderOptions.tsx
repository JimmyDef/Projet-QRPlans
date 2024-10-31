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
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={() => console.log('clickeeeed')}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem>Renommer</DropdownMenuItem>

        <DropdownMenuItem>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
