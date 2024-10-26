import { Router } from 'express'
import { parseISO, startOfHour } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()

const appointmentRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all()
  response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDate = startOfHour(parseISO(date))

  const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate)

  if (findAppointmentInSameDate) {
    response.status(400).json({ message: 'this appointment is already booked' })
  }

  const appointment = appointmentRepository.create(provider, parsedDate)
  response.json(appointment)
})

export default appointmentsRouter
