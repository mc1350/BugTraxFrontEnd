import axios from 'axios';
import Project from '../types/project.type';
import { getAppURL } from './webservices';


export async function getProject(id:string) {
  const url = getAppURL() + id;
  const res = await axios.get(url);
  return res;
}

export async function getAllProject(){
  const url = getAppURL() + '/project';
  const res = await axios.get(url);
  return res;
}

export async function saveProject(p:Project){
  const url = getAppURL() + '/project';
  const res = await axios.post(url, p);
  return res.data;
}

export async function deleteProject(id) {
  const url = getAppURL() + `/project/${id}`;
  const res = await axios.delete(url);
}

export async function updateProject(id, p) {
  const url = getAppURL() + `/project/${id}`;
  const res = await axios.put(url, p);
}

export async function findProjectById(id) {
  const url = getAppURL() + `/project/${id}`;
  const res = await axios.get(url);
  return res;
}