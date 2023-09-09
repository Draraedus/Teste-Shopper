import axios from 'axios';

export async function getProducts(): Promise<any>{

  const serverUrl = 'http://localhost:3001'
  return axios.get(`${serverUrl}/products`)
}

export async function getPacks(): Promise<any>{

  const serverUrl = 'http://localhost:3001'
  return axios.get(`${serverUrl}/packs`)
}