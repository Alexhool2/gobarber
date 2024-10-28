import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

const appointmentRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all()
  response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    )

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    })

    response.json(appointment)
  } catch (err) {
    response.status(400).json({ error: (err as Error).message })
  }
})

export default appointmentsRouter
