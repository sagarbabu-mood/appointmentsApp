import {Component} from 'react'

import {format} from 'date-fns'

import './index.css'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: '',
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <>
        <div className="main-container">
          <div className="responsive-container">
            <div className="appointments-container">
              <div className="add-appointment-container">
                <form className="form" onSubmit={this.onAddAppointment}>
                  <h1 className="add-appointment-heading">Add Appointment</h1>
                  <label htmlFor="appointmentName" className="title">
                    TITLE
                  </label>
                  <input
                    placeholder="TITLE"
                    type="text"
                    id="appointmentName"
                    className="input"
                    onChange={this.onChangeTitleInput}
                    value={titleInput}
                  />
                  <label htmlFor="appointmentDate" className="date">
                    DATE
                  </label>
                  <input
                    onChange={this.onChangeDateInput}
                    type="date"
                    id="appointmentDate"
                    className="input"
                    value={dateInput}
                  />
                  <button className="add-button" type="submit">
                    Add
                  </button>
                </form>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="appointments-img"
                />
              </div>
              <hr className="hr" />
              <div className="header-with-filter-container">
                <h1 className="appointments-heading">Appointments</h1>
                <button
                  type="button"
                  className={`filter-style ${filterClassName}`}
                  onClick={this.onFilter}
                >
                  Starred
                </button>
              </div>
              <ul className="appointments-list">
                {filteredAppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentDetails={eachAppointment}
                    toggleIsStarred={this.toggleIsStarred}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
