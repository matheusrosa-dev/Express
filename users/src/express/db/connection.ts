import { MySQL } from "../../core/shared/infra/db/my-sql/connection";

const mySqlConnection = new MySQL().connection;

export { mySqlConnection };
