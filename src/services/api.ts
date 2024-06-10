import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://www.superheroapi.com/api.php/2251007251738208/'
})

export const getAllHeroesFromApi = async (maxHeroes: number) => {
  const a = []
  for (let id = 1; id < maxHeroes; id++) {
    a.push(api.get(`${id}`))
  }

  return Promise.all(a)
}
