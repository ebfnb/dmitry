import { FatalError } from "./errorClasses"
import {isInstance} from 'apollo-errors'

export default (resolver) => async (...args) => {
  try {
    return await resolver(...args);
  } catch (err) {
    if (!isInstance(err)) {
      throw new FatalError({ data: { message: err.message } });
    } else {
      throw err;
    }
  }
}