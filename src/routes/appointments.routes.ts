/* eslint-disable camelcase */
import { Router } from 'express'
import { parseISO } from 'date-fns'
import { appointmentRepository } from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentRepository.getAllAppointments()
  response.json(appointments)
})
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)
  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  })

  response.json(appointment)
})

export default appointmentsRouter
