import { mount, unmount } from '@cypress/react'
import App from '../App'
import { manager1 } from './credentials'
import specTitle from 'cypress-sonarqube-reporter/specTitle'
import {
  manager2,
  whoamiManagerMock,
  attendanceMock,
  attendance1Mock,
  coursesMock,
  teachersMock,
} from './mocks/responses'

describe(specTitle('Manager list attendance'), () => {
  beforeEach(() => {
    mount(<App />)
    cy.get('#username').type(manager1.username)
    cy.get('#password').type(manager1.password)
    cy.get('button').contains('Connexion').click()
    cy.intercept('GET', `/whoami`, whoamiManagerMock).as('getWhoami')
    cy.intercept('GET', `/attendance?page=1&page_size=10`, attendanceMock).as('getAttendance')
    cy.intercept('GET', `/courses?page=1&page_size=5`, coursesMock).as('getCourses')
    cy.intercept('GET', `/teachers?page=1&page_size=5`, teachersMock).as('getTeachers')
    cy.intercept('GET', `/managers/${manager2.id}`, manager2).as('getManager')
    cy.wait('@getWhoami')
    cy.wait('@getManager')
    cy.get('[data-testid="students-menu"]').click()
    cy.get('[href="#/attendance"]').click()
    cy.wait('@getAttendance')
  })

  it('can list and filter students attendance', () => {
    cy.get('body').click(attendanceMock.length)
    cy.intercept('GET', `/attendance?page=1&page_size=10&attendance_statuses=PRESENT`, [attendance1Mock]).as('getAttendanceFiltered')
    cy.get('[data-testid="menu-list-action"]').click()
    cy.get('[data-testid="add-filter"]').click()
    cy.wait('@getTeachers')
    cy.wait('@getCourses')
    cy.get('[data-testid="attendance-status-filter"]').click()
    cy.get('[value="PRESENT').click()
    cy.get('body').click('bottomRight')

    cy.get('[data-testid="apply-filter"]').click()
    cy.wait('@getAttendanceFiltered')
    cy.get('tbody tr').should('have.length', 1)
    cy.should('contain', attendance1Mock.student.first_name)
      .should('contain', attendance1Mock.place)
  })

  afterEach(()=>{
    unmount()
  })
})
