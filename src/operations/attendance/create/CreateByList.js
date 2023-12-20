import React from 'react'
import { useMediaQuery } from '@mui/material'
import { FunctionField, TextField } from 'react-admin'
import { Actions } from './Actions'
import { HaList } from '../../../ui/haList'
import { AttendanceCreateActions } from './AttendanceCreateActions'

export function CreateByList(){
  const isSmall = useMediaQuery('(max-width: 650px)')

  return (
    <HaList
      title='Création de pointage'
      actions={<AttendanceCreateActions />}
      resource='students'
      mainSearch={{source: 'first_name', label: 'Prénom·s'}}
      listProps={{ title: "Pointages" }}
      datagridProps={{
        rowClick: 'none'
      }}
    >
      <TextField source='ref' label='Référence' />
      <TextField source='first_name' label='Prénom·s' />
      { !isSmall  && <TextField source='last_name' label='Nom·s' /> }
      <FunctionField render={record => <Actions sx={{ gap: 2, justifyContent:'end'}} studentId={record.ref} />} />
    </HaList>
  )
}
