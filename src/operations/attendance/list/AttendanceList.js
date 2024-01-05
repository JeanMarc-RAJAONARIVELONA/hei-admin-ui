import React from 'react'
import { FunctionField, TextField } from 'react-admin'
import { formatDate } from '../../../ui/utils'
import { AttendanceActions } from './AttendanceActions'
import { HaList } from '../../../ui/haList'
import { PanToolAltOutlined } from '@mui/icons-material'

export function AttendanceList() {
  return (
    <HaList
      title='Listes des pointages'
      icon={ <PanToolAltOutlined /> }
      mainSearch={{source:'student_key_word', label: 'Étudiant'}}
      actions={<AttendanceActions />}
      resource='attendance'
    >
      <TextField source='student.ref' label='Référence' />
      <TextField source='student.first_name' label='Prénom·s' />
      <TextField source='place' label='Lieu' />
      <FunctionField label='Heure' render={record => formatDate(record.created_at) || 'Absent' }/>
    </HaList>
  )
}
