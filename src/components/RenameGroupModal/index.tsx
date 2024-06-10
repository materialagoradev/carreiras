import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

interface IGroups {
  open: boolean
  handleClose: () => void
  renameGroup: (name: string) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 100,
  bgcolor: 'background.paper',
  borderRadius: 8,
  boxShadow: 24,
  p: 4
}

const RenameGroupM: React.FC<IGroups> = ({
  open,
  handleClose,
  renameGroup
}) => {
  const getInput = React.useRef<HTMLInputElement>(null)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontWeight={'bold'} variant="h6">
            Digite um novo nome para o grupo
          </Typography>
          <input
            style={{ padding: 5, marginRight: 3, marginTop: 12 }}
            ref={getInput}
          />
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => {
              renameGroup(String(getInput.current?.value))
              handleClose()
            }}
          >
            Atualizar
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
export default RenameGroupM
