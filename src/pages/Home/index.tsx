import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  ListItem,
  Typography
} from '@mui/material'
import { api, getAllHeroesFromApi } from '../../services/api'
import Card from '../../components/Card'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupCard from '../../components/GroupCard'
import ContextMenu from '../../components/ContextMenu'
import { useMenuState } from '@szhsin/react-menu'
import AddGroupModal from '../../components/AddGroupModal'
import RenameGroupM from '../../components/RenameGroupModal'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import { group } from 'console'

export interface Iheroes {
  config: {}
  data: {
    id: string
    name: string
    powerstats: {
      intelligence: string
      strength: string
      speed: string
      durability: string
      power: string
      combat: string
    }
    biography: {
      'full-name': string
      'alter-egos': string
      aliases: []
      'place-of-birth': string
      'first-appearance': string
      publisher: string
      alignment: string
    }
    image: {
      url: string
    }
  }
}

export interface oneHeroe {
  id: string
  name: string
  powerstats: {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
  }
  biography: {
    'full-name': string
    'alter-egos': string
    aliases: [string, string, string]
    'place-of-birth': string
    'first-appearance': string
    publisher: string
    alignment: string
  }
  appearance: {
    gender: string
    race: string
    height: [string, string]
    weight: [string, string]
    'eye-color': string
    'hair-color': string
  }
  work: {
    occupation: string
    base: string
  }
  connections: {
    'group-affiliation': string
    relatives: string
  }
  image: {
    url: string
  }
}

export interface Igroup {
  name: string
  list: string[]
  id: string
}

export interface IanchorProps {
  x: number
  y: number
}
export const generateId = () => {
  return `${Math.random() * 100} ${new Date().toISOString()} `
}

const Home: React.FC = () => {
  const [allHeroes, setAllHeroes] = useState<Iheroes[] | null>([])
  const [oneHeroe, setOneHeroe] = useState([])
  const [numGetHero, setNumGetHeroes] = useState<number>(19)
  const [isActived, setIsActived] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [openRenameModal, setOpenRenameModal] = React.useState(false)
  const [groups, setGroups] = useState<Igroup[]>([])
  const [anchorPoint, setAnchorPoint] = useState<IanchorProps>({ x: 0, y: 0 })
  const [saveIndexForRenameModal, setSaveIndexRenameModal] = useState<
    string | null
  >(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const getInput = useRef<HTMLInputElement>(null)
  const [menuProps, toggleMenu] = useMenuState()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setSaveIndexRenameModal(null)
    setOpen(false)
  }

  const handleOpenRenameModal = () => {
    setOpenRenameModal(true)
  }

  const handleCloseRenameModal = () => setOpenRenameModal(false)

  const handleContextMenu = useCallback<
    (e: MouseEvent<any>, id: string) => void
  >(
    (e, id) => {
      setSelectedId(id)
      e.preventDefault()
      setAnchorPoint({ x: e.clientX, y: e.clientY })
      toggleMenu(true)
    },
    [setAnchorPoint, toggleMenu]
  )

  const addToGroup = (groupIndex: number) => {
    setGroups(lastState => {
      if (selectedId) {
        lastState[groupIndex].list.push(selectedId)
      }
      localStorage.setItem('groups', JSON.stringify(groups))
      return lastState
    })
  }

  const removeFromGroup = (groupId: string, id: string) => {
    setGroups(lastState => {
      const group = lastState.find(group => group.id == groupId)
      if (!group) {
        return lastState
      }
      const newList = group.list.filter(currentId => currentId !== id)
      group.list = newList

      return lastState.map(lastGroup =>
        lastGroup.id == group.id ? group : lastGroup
      )
    })
  }

  const addGroup = (group: Igroup) => {
    setGroups(lastState => [group, ...lastState])
  }

  const renameGroup = (i: string | null, name: string) => {
    if (i === null) {
      return
    }
    setGroups(lastState =>
      lastState.map(group => {
        return { ...group, name: group.id === i ? name : group.name }
      })
    )
  }

  const deleteGroup = (id: string) => {
    setGroups(lastState => {
      const newList = lastState.filter((_, index) => _.id !== id)
      return [...newList]
    })
  }

  const getData = async () => {
    const response = await getAllHeroesFromApi(numGetHero)
    setAllHeroes(response)
  }

  const getSearchHero = async () => {
    const inputValue = getInput.current?.value
    const response = await api.get(`search/${inputValue}`)
    if (inputValue != '') {
      setIsActived(true)
      setOneHeroe(response.data.results)
    } else {
      setIsActived(false)
      getData()
    }
  }

  const loadMoreHeroes = async () => {
    setNumGetHeroes(lastState => lastState + 10)
  }

  useEffect(() => {
    // const data = localStorage.getItem('groups')
    // const parsedData = JSON.parse(data || '')
    // setGroups(parsedData)
  }, [])

  useEffect(() => {
    getData()
  }, [numGetHero])

  return (
    <>
      <ContextMenu
        groups={groups}
        menuProps={menuProps}
        anchorPoint={anchorPoint}
        toggleMenu={toggleMenu}
        addToGroup={addToGroup}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <input type={'text'} ref={getInput} />
        <Button onClick={() => getSearchHero()} variant="contained">
          Pesquisar
        </Button>
        <RenameGroupM
          open={openRenameModal}
          handleClose={handleCloseRenameModal}
          renameGroup={name => renameGroup(saveIndexForRenameModal, name)}
        />
        <AddGroupModal
          open={open}
          handleClose={handleClose}
          addGroup={(group: Igroup) => addGroup({ ...group, id: generateId() })}
        />
        <Button onClick={() => handleOpen()} variant="contained">
          Criar Grupo
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4
        }}
      >
        <Box
          sx={{
            backgroundColor: 'grey',
            height: 1500,
            borderTopRightRadius: 9,
            borderTopLeftRadius: 9,
            boxShadow: 4
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#F3F3F3',
              width: 350,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8
            }}
          >
            <Typography>Grupos</Typography>
          </Box>
          {groups.map((g, i) => (
            <Accordion key={i} disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    p: 1
                  }}
                >
                  <Typography>{g.name} </Typography>
                  <IconButton
                    onClick={e => {
                      setSaveIndexRenameModal(g.id)
                      handleOpenRenameModal()
                    }}
                    size="small"
                  >
                    <EventRepeatIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteGroup(g.id)}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {g.list.map((hero: string) => (
                  <GroupCard
                    removeFromGroup={removeFromGroup}
                    key={hero}
                    id={hero}
                    groupId={g.id}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box sx={{ ml: 10 }}>
          <Grid
            spacing={{ xs: 0.5, md: 1 }}
            container
            columns={{ xs: 2, sm: 5, md: 13 }}
          >
            {isActived
              ? oneHeroe?.map((oneHeroes: oneHeroe) => (
                  <Grid item xs={2} sm={4} md={4} key={oneHeroes.id}>
                    <ListItem>
                      <Card
                        id={oneHeroes.id}
                        handleContextMenu={handleContextMenu}
                        powerStatus={oneHeroes.powerstats}
                        name={oneHeroes.name}
                        image={oneHeroes.image.url}
                        type={oneHeroes.biography.alignment}
                      />
                    </ListItem>
                  </Grid>
                ))
              : allHeroes?.map((heroe: Iheroes) => (
                  <Grid item xs={2} sm={4} md={4} key={heroe.data.id}>
                    <ListItem>
                      <Card
                        id={heroe.data.id}
                        handleContextMenu={handleContextMenu}
                        powerStatus={heroe.data.powerstats}
                        name={heroe.data.name}
                        image={heroe.data.image.url}
                        type={heroe.data.biography.alignment}
                      />
                    </ListItem>
                  </Grid>
                ))}
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Button variant="contained" onClick={loadMoreHeroes}>
              Carregar mais herois
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home
