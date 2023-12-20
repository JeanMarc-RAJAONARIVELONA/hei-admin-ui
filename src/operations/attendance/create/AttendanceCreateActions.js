import { FilterForm, TextFilter, LinkButton } from '../../../ui/haToolbar'
import { QrCodeScanner } from '@mui/icons-material'

export function AttendanceCreateActions() {
  return (
    <>
      <LinkButton icon={<QrCodeScanner />} to='/attendance/scan' label='QrCode' />
      <FilterForm>
        <TextFilter label='Prénom·s' source='first_name' />
        <TextFilter label='Nom·s' source='last_name' />
      </FilterForm>
    </>
  )
}
