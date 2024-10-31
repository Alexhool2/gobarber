import { AppDataSource } from '../database/data-source'
import User from '../models/User'

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
      throw new Error('Email address already used')
    }
    const user = userRepository.create({
      name,
      email,
      password,
    })
    await userRepository.save(user)
    return user
  }
}
export default CreateUserService
