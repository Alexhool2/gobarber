/* eslint-disable camelcase */
import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment'
import { appointmentRepository } from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      await appointmentRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
