import axios from 'axios';
import Ticket from '../types/ticket.type';
import { getAppURL } from './webservices';


export async function getTicket(id:string) {
  const url = getAppURL() + '/ticket/' + id;
  const res = await axios.get(url);
  return res;
}

export async function getAllTicket(){
  const url = getAppURL() + '/ticket';
  const res = await axios.get(url);
  return res;
}


export async function searchByID(ticketID) {
  const url = getAppURL() + `/ticket?id=${ticketID}`;
  const res = await axios.get(url);
  return res;
}

export async function saveTicket(ti:Ticket){
  const url = getAppURL() + '/ticket';
  const res = await axios.post(url, ti);
  return res.data;
}

export async function deleteTicket(id) {
  const url = getAppURL() + `/ticket/${id}`;
  const res = await axios.delete(url);
}

export async function updateTicket(id, ti:Ticket) {
  const url = getAppURL() + `/ticket/${id}`;
  const res = await axios.put(url, ti);
}

export async function findTicketById(projectID) {
  const url = getAppURL() + `/ticket?projectID=${projectID}`;
  const res = await axios.get(url);
  return res;
}