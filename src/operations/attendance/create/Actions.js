import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { AttendanceMovementType } from '@haapi/typescript-client';
import { qrcode } from './config';

export function Actions({ studentId, sx = {} }) {
  const [ clicked, setClicked ] = useState('')

  const removeClicked = async ()=> setTimeout(()=>setClicked(''), 2500)
  
  const handlerClick = (type)=>{
    if(clicked === ''){
      qrcode.addAttendance(studentId, type)
      setClicked(type) 
      removeClicked()
    }
  }

  return (
    <Box component='div' sx={{ display: 'flex',alignItems: 'center', gap: 1, ...sx }}>
      <Button 
        variant='outlined' 
        color='primary' 
        size='small'
        onClick={()=>handlerClick(AttendanceMovementType.IN)}
      >
        {clicked === AttendanceMovementType.IN ? 'Succès' : 'Arriver'}
      </Button>
      <Button 
        variant='outlined' 
        color='warning' 
        size='small'
        onClick={() => handlerClick(AttendanceMovementType.OUT)}
      >
        {clicked === AttendanceMovementType.OUT ? 'Succès' : 'Sortie'}
      </Button>
    </Box>
  )
}
