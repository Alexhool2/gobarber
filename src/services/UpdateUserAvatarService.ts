/* eslint-disable camelcase */
import { AppDataSource } from '../database/data-source'
import User from '../models/User'
import path from 'path'
import uploadConfig from '../config/upload'
import fs from 'fs'
import AppError from '../errors/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({ where: { id: user_id } })

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFilename

    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
