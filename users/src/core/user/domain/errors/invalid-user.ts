export class InvalidUserError extends Error {
  constructor() {
    super("User is not valid");
    this.name = "InvalidUserError";
  }
}
