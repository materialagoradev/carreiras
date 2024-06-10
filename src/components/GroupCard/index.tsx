import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

interface GroupCardProps {
  id: string
  removeFromGroup: any
  groupId: string
}

interface Hero {
  name: string
  image: string
}

const GroupCard: React.FC<GroupCardProps> = ({
  id,
  removeFromGroup,
  groupId: groupId
}) => {
  const [hero, setHero] = useState<Hero | null>(null)

  const getHeroWithId = async (id: string) => {
    const data = await (await api.get(id)).data
    setHero({ name: data.name, image: data.image.url })
  }

  useEffect(() => {
    getHeroWithId(id)
  }, [])

  return (
    <>
      <Box>
        {!hero ? (
          <Typography>Caregando...</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 5,
              background: '#F3F3F3',
              mt: 1
            }}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {hero.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
              <IconButton
                onClick={() => removeFromGroup(groupId, id)}
                aria-label="delete"
                size={'small'}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <img
                style={{
                  width: 60,
                  height: 70,
                  borderRadius: 8
                }}
                src={hero.image}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default GroupCard
