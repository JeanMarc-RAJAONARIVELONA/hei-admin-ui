import { AttendanceList } from "./list";
import { CreateByList } from "./create"
export * from "./create"
export * from "./list"

const attendance = {
  list: AttendanceList,
  create: CreateByList,
}

export default attendance;
