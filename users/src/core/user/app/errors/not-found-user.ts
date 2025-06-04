export class NotFoundUser extends Error {
  constructor() {
    super("User not found");
  }
}
