export class UserAlreadyAdmin extends Error {
  constructor() {
    super("User already has admin role");
  }
}
