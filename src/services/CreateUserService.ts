import { AppDataSource } from '../database/data-source'
import AppError from '../errors/AppError'
import User from '../models/User'
import { hash } from 'bcryptjs'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)

    const checkUserExists = await userRepository.findOne({
      where: { email },
    })
    if (checkUserExists) {
      throw new AppError('Email address already used')
    }
    const hashedPassword = await hash(password, 8)
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    await userRepository.save(user)
    return user
  }
}
export default CreateUserService
