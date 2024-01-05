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

const attendance2 = attendanceMock[1]
const attendance2Student = attendance2.student

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
    cy.intercept('GET', `/attendance?page=1&page_size=10&attendance_statuses=PRESENT`, [attendance1Mock]).as('attendanceByStatus')
    cy.intercept('GET', `/attendance?page=1&page_size=10&student_key_word=${attendance2Student.first_name}`, [attendance2]).as('attendanceByStudentKeyWord')
    
    cy.wait('@getWhoami', { timeout: 20_000 })
    cy.wait('@getManager')
    cy.get('[data-testid="students-menu"]').click()
    cy.get('[href="#/attendance"]').click()
    
    //remove actual filter
    cy.get('[data-testid="menu-list-action"]').click()
    cy.get('[data-testid="add-filter"]').click()
    cy.wait('@getTeachers')
    cy.wait('@getCourses')
    cy.get('[data-testid="clear-filter"]').click()
  })

  it('can list and filter attendance filter actions', () => {
    cy.get('[data-testid="attendance-status-filter"]').click()
    cy.get('[value="PRESENT').click()
    cy.get('body').click('bottomRight')
    cy.get('[data-testid="apply-filter"]').click()
    cy.wait('@attendanceByStatus')
    cy.get('tbody tr').should('have.length', 1)
    cy.should('contain', attendance1Mock.student.first_name)
      .should('contain', attendance1Mock.place)
  })

  it('can list and filter attendance using main-search', () => {
    cy.get('[data-testid="apply-filter"]').click()
    cy.get('[data-testid="main-search-filter"]').type(attendance2Student.first_name)
    cy.wait('@attendanceByStudentKeyWord')
    cy.get('tbody tr').should('have.length', 1)
    cy.should('contain', attendance2Student.first_name)
      .should('contain', attendance2.place)
  })

  afterEach(()=>{
    unmount()
  })
})
