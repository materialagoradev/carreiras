import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { formatType, typePerson } from '../Card'

interface Imodal {
  open: boolean
  handleClose: () => void
  name: string
  image: string
  type: string
  powerStatus: {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
  }
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 560,
  width: 300,
  borderRadius: 8,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
}

const HeroModal: React.FC<Imodal> = ({
  open,
  handleClose,
  name,
  image,
  type,
  powerStatus
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <img
              src={image}
              style={{
                width: '300px',
                height: '250px',
                borderRadius: 10
              }}
            />
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 1,
                mb: 1
              }}
              variant="h5"
            >
              {name}
            </Typography>
            <Box
              sx={{
                backgroundColor: typePerson(type),
                borderRadius: 10
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                variant="subtitle1"
              >
                {formatType(type)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1,
                justifyContent: 'center',
                gap: 0.6
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                👊 Combate: <strong> {powerStatus.combat}</strong>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                😡 Poder: <strong>{powerStatus.power}</strong>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                🤓 Inteligencia: <strong>{powerStatus.intelligence}</strong>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                🥶 Durabilidade:<strong>{powerStatus.durability}</strong>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                🐇 Velocidade: <strong>{powerStatus.speed}</strong>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  p: 0.5,
                  justifyContent: 'center',
                  backgroundColor: '#c9c8c8',
                  borderRadius: 8
                }}
              >
                🔥 Força: <strong>{powerStatus.strength}</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
export default HeroModal
