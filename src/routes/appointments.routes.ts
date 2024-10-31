/* eslint-disable camelcase */
import { Router } from 'express'
import { parseISO } from 'date-fns'
import { appointmentRepository } from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  try {
    const appointments = await appointmentRepository.getAllAppointments()
    response.json(appointments)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch appointment' })
  }
})
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    response.json(appointment)
  } catch (err) {
    response.status(400).json({ error: (err as Error).message })
  }
})

export default appointmentsRouter
