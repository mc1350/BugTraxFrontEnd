import { integerPropType } from "@mui/utils";

export default interface Ticket {
  id?: any | null,
  title: string,
  description: string,
  projectID: number,
  priority: string,
  status: string,
  created: string,
  updated: string,
  assigned: string
}
