import React, { useState } from 'react'
import { Box, Button, useMediaQuery } from '@mui/material'
import { AttendanceMovementType } from '@haapi/typescript-client';
import { qrcode } from './config';

export function Actions({ studentId, sx = {} }) {
  const [ clicked, setClicked ] = useState('')
  const isSmall = useMediaQuery('(max-width: 750px)')

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
        size={isSmall ? 'small' : 'medium'}
        onClick={()=>handlerClick(AttendanceMovementType.IN)}
      >
        {clicked === AttendanceMovementType.IN ? 'Succès' : 'Arriver'}
      </Button>
      <Button 
        variant='outlined' 
        color='warning' 
        size={ isSmall ? 'small' : 'medium' }
        onClick={() => handlerClick(AttendanceMovementType.OUT)}
      >
        {clicked === AttendanceMovementType.OUT ? 'Succès' : 'Sortie'}
      </Button>
    </Box>
  )
}
