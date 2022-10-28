import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  ListItem,
  TextField,
  Typography
} from '@mui/material'
import { api, getAllHeroesFromApi } from '../../services/api'
import Card from '../../components/Card'

interface Iheroes {
  config: {}
  data: {
    id: string
    name?: string
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

interface oneHeroe {
  response: string
  'results-for': string
  results: {
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
}

const Home: React.FC = () => {
  const [allHeroes, setAllHeroes] = useState<Iheroes[] | null>([])
  const [oneHeroe, setOneHeroe] = useState([])
  const [isActived, setIsActived] = useState(false)
  const getInput = useRef<HTMLInputElement>(null)

  const getData = async () => {
    const response = await getAllHeroesFromApi(10)
    setAllHeroes(response)
  }

  const getSearchHeroe = async () => {
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

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <input type={'text'} ref={getInput} />
        <Button onClick={() => getSearchHeroe()} variant="contained">
          Pesquisar
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {isActived
            ? oneHeroe?.map((oneHeroes: any) => (
                <Grid item xs={2} sm={4} md={4} key={oneHeroes.id}>
                  <ListItem>
                    <Card
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
                      name={heroe.data.name}
                      image={heroe.data.image.url}
                      type={heroe.data.biography.alignment}
                    />
                  </ListItem>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  )
}

export default Home
