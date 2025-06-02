import { z } from "zod";
import { InvalidUserError } from "../../domain/errors";
import { Status } from "../../domain/enums";
import { Email } from "../../../shared/domain/value-objects";

type InputProps = {
  name: string;
  email: string;
  status: string;
};

export class Input {
  name: string;
  email: Email;

  constructor(props: InputProps) {
    ValidateInput.validate(props);

    this.name = props.name;
    this.email = new Email(props.email) as Email;
  }
}

class ValidateInput {
  static validate(props: InputProps) {
    const schema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      status: z.nativeEnum(Status),
    });

    const { success: isValid } = schema.safeParse(props);

    if (!isValid) {
      throw new InvalidUserError();
    }
  }
}
