import axios from "axios";
import Team from "../types/team.type";
import { getAppURL } from "./webservices";

export async function findTeam(projectID) {
  const url = getAppURL() + `/team?projectID=${projectID}`;
  const res = await axios.get(url);
  return res;
}

export async function deleteTeamMember(id) {
  const url = getAppURL() + `/team/${id}`;
  const res = await axios.delete(url);
}

export async function saveTeamMember(t: Team){
  const url = getAppURL() + '/team';
  const res = await axios.post(url, t);
  return res.data;
}