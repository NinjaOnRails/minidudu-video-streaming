import axios from 'axios'

export default axios.create({
  baseURL: 'https://minidudu-streams-api.herokuapp.com'
})