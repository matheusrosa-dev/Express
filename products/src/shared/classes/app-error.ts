export class AppError extends Error {
  statusCode: number;

  constructor(props: { message: string; statusCode: number }) {
    super(props.message);
    this.statusCode = props.statusCode;
  }
}
