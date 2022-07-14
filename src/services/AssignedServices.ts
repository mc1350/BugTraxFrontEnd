import { getAppURL } from './webservices';
import axios from 'axios';
import Assigned from '../types/assigned.type';


export async function findAssignedByEmail(email) {
  const url = getAppURL() + `/assigned/"${email}"`;
  const res = await axios.get(url);
  return res;
}

export async function findAssignedByID(ticketID) {
  const url = getAppURL() + `/assigned?ticketID=${ticketID}`;
  const res = await axios.get(url);
  return res;
}

export async function deleteAssignment(id) {
  const url = getAppURL() + `/assigned/${id}`;
  const res = await axios.delete(url);
}

export async function saveAssignment(a: Assigned){
  const url = getAppURL() + '/assigned';
  const res = await axios.post(url, a);
  return res.data;
}