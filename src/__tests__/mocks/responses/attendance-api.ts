import { courses1Mock } from "./courses-api";
import { group1, student1 } from "./groups-api";
import { teacher1Mock } from "./teacher-api";

export const attendanceMock = [
  {
    "id": "attendance_id1",
    "created_at": "2023-12-20T13:33:59.810Z",
    "late_of": 0,
    "place": "IVANDRY",
    "is_late": true,
    "course_session": {
      "id": "string",
      "awareded_course": {
        "id": "string",
        "main_teacher": teacher1Mock,
        "course": courses1Mock,
        "group": group1
      },
      "begin": "2023-12-20T13:33:59.811Z",
      "end": "2023-12-20T13:33:59.811Z"
    },
    "student": student1
  },
  {
    "id": "attendance_id2",
    "created_at": "2023-12-20T13:33:59.810Z",
    "late_of": 0,
    "place": "ANDRAHARO",
    "is_late": true,
    "course_session": {
      "id": "string",
      "awareded_course": {
        "id": "string",
        "main_teacher": teacher1Mock,
        "course": courses1Mock,
        "group": group1
      },
      "begin": "2023-12-20T13:33:59.811Z",
      "end": "2023-12-20T13:33:59.811Z"
    },
    "student": student1
  },
] 

export const attendance1Mock = attendanceMock[0];
