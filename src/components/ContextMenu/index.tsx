import React from 'react'
import {
  MenuItem,
  ControlledMenu,
  SubMenu,
  MenuState
} from '@szhsin/react-menu'
import { IanchorProps, Igroup } from '../../pages/Home'
import { Typography } from '@mui/material'

interface ContextMenuProps {
  groups: Igroup[]
  menuProps: { state?: MenuState | undefined; endTransition: () => void }
  anchorPoint: IanchorProps
  toggleMenu: (open?: boolean | undefined) => void
  addToGroup: (groupIndex: number) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  groups,
  menuProps,
  anchorPoint,
  toggleMenu,
  addToGroup
}) => {
  return (
    <ControlledMenu
      {...menuProps}
      anchorPoint={anchorPoint}
      onClose={() => toggleMenu(false)}
    >
      <SubMenu label={<Typography>Adicionar ao grupo</Typography>}>
        {groups.map((group, i) => (
          <MenuItem key={group.name} onClick={() => addToGroup(i)}>
            <Typography>{group.name}</Typography>
          </MenuItem>
        ))}
      </SubMenu>
    </ControlledMenu>
  )
}

export default ContextMenu
