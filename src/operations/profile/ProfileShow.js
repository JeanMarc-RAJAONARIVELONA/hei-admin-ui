import { EmailField, FunctionField, SimpleShowLayout, Show, TextField, TopToolbar, EditButton, NumberField, Button, useNotify } from 'react-admin'
import { Link } from '@mui/material'
import authProvider from '../../providers/authProvider'
import { unexpectedValue, CustomDateField, GenCertificateButton } from '../utils'
import { EnableStatus, Sex, WhoamiRoleEnum } from '@haapi/typescript-client'

export const ProfileLayout = () => {
  const emptyText = 'Non défini.e'
  const sexRenderer = user => {
    switch (user.sex) {
      case Sex.M:
        return 'Homme'
      case Sex.F:
        return 'Femme'
      case null:
        return emptyText
      default:
        return unexpectedValue
    }
  }
  const statusRenderer = user => {
    if (user.status === EnableStatus.ENABLED) return 'Actif·ve'
    if (user.status === EnableStatus.SUSPENDED) return 'Suspendu·e'
    if (user.status === EnableStatus.DISABLED) return 'Quitté.e'
    return unexpectedValue
  }
  const phoneRenderer = data => (data.phone ? <Link href={`tel:${data.phone}`}>{data.phone}</Link> : <span>{emptyText}</span>)
  return (
    <SimpleShowLayout>
      <TextField source='ref' label='Référence' />
      <TextField source='first_name' id='first_name' label='Prénom(s)' />
      <TextField source='last_name' label='Nom(s)' />
      <FunctionField label='Sexe' render={sexRenderer} />
      <FunctionField label='Téléphone' render={phoneRenderer} />
      <TextField source='nic' label='Numéro CIN' emptyText={emptyText} />
      <CustomDateField source='birth_date' label='Date de naissance' showTime={false} emptyText={emptyText} />
      <TextField source='birth_place' label='Lieu de naissance' emptyText={emptyText} />
      <TextField source='address' label='Adresse' component='pre' emptyText={emptyText} />
      <EmailField source='email' label='Email' />
      <CustomDateField source='entrance_datetime' label="Date d'entrée chez HEI" showTime={false} />
      <FunctionField label='Statut' render={statusRenderer} />
    </SimpleShowLayout>
  )
}

const Actions = ({ userId }) => {
  const role = authProvider.getCachedRole()
  return (
    <TopToolbar>
      <EditButton to={`/profile/${userId}/edit`} data-testid='profile-edit-button' />
      { role == WhoamiRoleEnum.STUDENT && <GenCertificateButton studentId={userId} /> }
    </TopToolbar>
  )
}
const ProfileShow = () => {
  const id = authProvider.getCachedWhoami().id
  return (
    <Show id={id} resource='profile' basePath='/profile' title='Mon profil' actions={<Actions userId={id} />}>
      <ProfileLayout />
    </Show>
  )
}

export default ProfileShow
