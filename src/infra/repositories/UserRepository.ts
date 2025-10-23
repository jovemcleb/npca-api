import { FilterQuery } from "mongoose";
import { ICreateUser } from "../../app/types/User";
import { UserDocument, UserModel, UserModelType } from "../models/User";

export class UserRepository {
  constructor(private readonly userModel: UserModelType = UserModel) {}

  public async findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).lean({ virtuals: true }).exec();
  }

  public async createUser(user: ICreateUser) {
    const { name, email, password, institution, course } = user;

    const { id } = await this.userModel.create({
      name,
      email,
      password,
      institution,
      course,
    });

    return { id };
  }
}
