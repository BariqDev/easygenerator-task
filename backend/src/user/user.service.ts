import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { MongoError } from 'mongodb';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserService {
  toResponseDto(user: UserDocument): UserProfileDto {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserProfileDto> {
    try {
      const savedUser = await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        hashed_password: createUserDto.password,
      });
      return this.toResponseDto(savedUser);
    } catch (error) {
      // Handle duplicate email (MongoDB E11000 error)
      if (error instanceof MongoError && error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getProfile(id: string): Promise<UserProfileDto | null> {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid user ID');

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return this.toResponseDto(user);
  }
}
