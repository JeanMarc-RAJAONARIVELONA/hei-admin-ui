import { Button, Show, EditButton, TopToolbar, Link, useRecordContext } from 'react-admin'

import { ProfileLayout } from '../profile/ProfileShow'
import { AttachMoney } from '@mui/icons-material'

import { WhoamiRoleEnum } from '@haapi/typescript-client'
import authProvider from '../../providers/authProvider'
import { GenCertificateButton } from '../utils'

const ActionsOnShow = ({ basePath, data, resource }) => {
  const record = useRecordContext()
  const role = authProvider.getCachedRole()

  return (
    <TopToolbar disableGutters>
      <EditButton basePath={basePath} resource={resource} record={data} />
      {record && (
        <Button label='Frais' aria-label='fees' component={Link} to={`/students/${record.id}/fees`}>
          <AttachMoney />
        </Button>
      )}
      { (role != WhoamiRoleEnum.TEACHER && record) && <GenCertificateButton studentId={record.id}/> }
    </TopToolbar>
  )
}

const StudentShow = () => {
  const role = authProvider.getCachedRole()
  return (
    <Show title='Étudiants' actions={role === WhoamiRoleEnum.MANAGER && <ActionsOnShow />}>
      <ProfileLayout />
    </Show>
  )
}

export default StudentShow
