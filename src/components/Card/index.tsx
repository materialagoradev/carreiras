import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { MouseEvent } from 'react'
import HeroModal from '../Modal'

interface Iprops {
  image: string
  name: string
  type: string
  powerStatus: {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
  }
  handleContextMenu: (e: MouseEvent<any>, id: string) => void
  id: string
}

export const typePerson = (a: string) => {
  if (a == 'good') {
    return '#60D660'
  } else {
    return '#D66460'
  }
}

export const formatType = (a: string) => {
  if (a == 'good') {
    return 'Heroi'
  } else {
    return 'Vilão'
  }
}

const Card: React.FC<Iprops> = ({
  image,
  name,
  type,
  powerStatus,
  handleContextMenu,
  id
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <HeroModal
        open={open}
        handleClose={handleClose}
        image={image}
        name={name}
        type={type}
        powerStatus={powerStatus}
      />

      <Box
        onContextMenu={e => handleContextMenu(e, id)}
        onClick={() => handleOpen()}
        sx={{
          p: 1,
          backgroundColor: '#d0d0d087',
          borderRadius: 5,
          '&:hover': {
            backgroundColor: 'grey'
          }
        }}
      >
        <img
          style={{
            width: '150px',
            height: '150px',
            borderRadius: 10
          }}
          src={image}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>{name}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: typePerson(type),
            borderRadius: 10,

            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant="subtitle1">{formatType(type)}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default Card
