import { Button, useNotify } from 'react-admin'
import { Download } from '@mui/icons-material'
import { studenstFileApi } from '../../providers/api'

export function GenCertificateButton({ studentId }){
  const notify = useNotify()
  
  const generate = ()=>{
    notify('Certificat de scolarité en cours de téléchargement', { autoHideDuration: 2000 })
    studenstFileApi().getStudentScholarshipCertificate(studentId)
      .catch(()=> notify("Erreur de téléchargement. Réessayez plus tard", { type: "error", autoHideDuration: 2500 }))
  }

  return (
    <Button label='Certificat' onClick={generate}> 
      <Download />
    </Button>
  ) 
}
