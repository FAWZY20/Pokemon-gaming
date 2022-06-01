import axios from 'axios';

export default axios.create({
  baseURL: `https://pokeapi-enoki.netlify.app/pokeapi.json`
});