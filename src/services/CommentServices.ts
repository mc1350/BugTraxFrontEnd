import axios from "axios";
import Comments from "../types/comments.type";

import { getAppURL } from "./webservices";

export async function findCommentByID(ticketID) {
  const url = getAppURL() + `/comment?ticketID=${ticketID}`;
  const res = await axios.get(url);
  return res;
}

export async function saveComment(c: Comments){
  const url = getAppURL() + '/comment';
  const res = await axios.post(url, c);
  return res.data;
}

export async function deleteComment(id) {
  const url = getAppURL() + `/comment/${id}`;
  const res = await axios.delete(url);
}
