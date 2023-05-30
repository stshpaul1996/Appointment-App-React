// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    textInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {textInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: textInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      textInput: '',
      dateInput: '',
    }))
  }

  onTextInput = event => {
    this.setState({textInput: event.target.value})
  }

  onDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {textInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter:empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg-page">
        <div className="appointment-container">
          <h1 className="heading">Add Appointments</h1>
          <div className="main-title-container">
            <form className="title-container" onSubmit={this.onAddAppointment}>
              <label className="title" htmlFor="Title">
                TITLE
              </label>
              <input
                id="Title"
                type="text"
                placeholder="Title"
                className="input-text"
                value={textInput}
                onChange={this.onTextInput}
              />
              <label className="title" type="Date" htmlFor="Date">
                DATE
              </label>
              <input
                id="Date"
                type="date"
                className="input-text"
                value={dateInput}
                onChange={this.onDateInput}
              />
              <button type="submit" className="input-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="starred-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              className={`starred-btn ${filterClassName}`}
              type="button"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
