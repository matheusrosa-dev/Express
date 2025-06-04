export class InvalidUser extends Error {
  constructor() {
    super("User is not valid");
  }
}
