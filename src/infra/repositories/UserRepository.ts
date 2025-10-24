import { FilterQuery } from "mongoose";
import { SignUpInput } from "../../app/types/User";
import { UserDocument, UserModel, UserModelType } from "../models/User";

export class UserRepository {
  constructor(private readonly userModel: UserModelType = UserModel) {}

  public async findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).lean({ virtuals: true }).exec();
  }

  public async findOneWithPassword(filter: FilterQuery<UserDocument>) {
    return this.userModel
      .findOne(filter)
      .select("+password")
      .lean({ virtuals: true })
      .exec();
  }

  public async createUser(user: SignUpInput) {
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
