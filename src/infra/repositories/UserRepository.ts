import { FilterQuery } from "mongoose";
import { SignUpInput } from "../../main/schemas/signUpSchema";
import { UserDocument, UserModel, UserModelType, UserRole } from "../models/User";

type UpdateUserData = Partial<SignUpInput> & {
  roles?: UserRole[];
};

export class UserRepository {
  constructor(private readonly userModel: UserModelType = UserModel) {}

  public async findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).lean({ virtuals: true }).exec();
  }

  public async findById(id: string) {
    return this.userModel.findById(id).lean({ virtuals: true }).exec();
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

  public async updateUser(id: string, updateData: UpdateUserData) {
    const user = await this.userModel
      .findOneAndUpdate({ _id: id }, updateData, { new: true })
      .lean({ virtuals: true })
      .exec();

    return { user };
  }

  public async deleteUser(id: string) {
    const user = await this.userModel
      .findOneAndDelete({ _id: id })
      .lean({ virtuals: true })
      .exec();

    return { user };
  }
}
