import axios from 'axios';
import User from '../types/user.type';
import { getAppURL } from './webservices';



export async function getAllUser(){
  const url = getAppURL() + '/user';
  const res = await axios.get(url);
  return res;
}

export async function saveUser(u: User){
  const url = getAppURL() + '/user';
  const res = await axios.post(url, u);
  return res.data;
}

export async function deleteUser(id) {
  const url = getAppURL() + `/user/${id}`;
  const res = await axios.delete(url);
}

