import 'reflect-metadata'
import Appointment from '../models/Appointment'
import { AppDataSource } from '../database/data-source'

export const appointmentRepository = AppDataSource.getRepository(
  Appointment,
).extend({
  async findByDate(date: Date): Promise<Appointment | null> {
    try {
      const findAppointment = await this.findOne({
        where: { date },
      })
      return findAppointment || null
    } catch (error) {
      console.error('Error in AppointmentRepository:', error)
      return null
    }
  },

  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const appointments = await this.find()
      return appointments
    } catch (error) {
      console.error('Error fetching appointments:', error)
      return []
    }
  },
})
