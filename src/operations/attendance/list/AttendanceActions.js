import { FilterForm, SelectFilter, DateTimeFilter, AutocompleteFilter } from '../../../ui/haToolbar'
import { teachingApi, usersApi } from '../../../providers/api'
import { AttendanceStatus } from '@haapi/typescript-client';

export function AttendanceActions() {
  return (
    <FilterForm>
      <SelectFilter
        label='Status'
        fetcher={[
          { label: 'Present', value: AttendanceStatus.PRESENT },
          { label: 'En Retard', value: AttendanceStatus.LATE },
          { label: 'Absent', value: AttendanceStatus.MISSING }
        ]}
        source='attendance_statuses'
        valueKey='value'
        labelKey='label'
      />
      <AutocompleteFilter
        fetcher={courseCode => teachingApi().getCourses(courseCode, undefined, undefined, undefined, undefined, undefined, undefined, 1, 5)}
        label='Cours'
        labelKey='code'
        labelKeyOnNull='name'
        valueKey='id'
        source='courses_ids'
      />
      <AutocompleteFilter
        fetcher={first_name => usersApi().getTeachers(1, 5, undefined, first_name)}
        label='Enseignants'
        labelKey='first_name'
        labelKeyOnNull='last_name'
        valueKey='id'
        source='teachers_ids'
      />
      <DateTimeFilter source='from' label='Après' />
      <DateTimeFilter source='to' label='Avant' />
    </FilterForm>
  )
}
