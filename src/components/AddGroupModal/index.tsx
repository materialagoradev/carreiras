import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { generateId } from '../../pages/Home'

interface IProps {
  open: boolean
  handleClose: () => void
  addGroup: Function
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

const AddGroupModal: React.FC<IProps> = ({ open, handleClose, addGroup }) => {
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
            Digite nome do grupo
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
              addGroup({
                name: getInput.current?.value,
                list: []
              })
              handleClose()
            }}
          >
            Criar Grupo
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
export default AddGroupModal
