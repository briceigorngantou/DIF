export const REGEX = {
  PHONE_NUMBER: RegExp(
    /^\+?[0-9]{1,3}[-.\s]?\(?[0-9]{1,3}\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/
  ),
  // PHONE_NUMBER : RegExp(/^(6|2)(2|3|[5-9])[0-9]{7}$/),
  EMAIL: RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  TEXT: RegExp(/^((\w{2,})+\s?)*$/),
  ADDRESS: RegExp(/^((\w{2,})+\s?)*$/),
  PASSWORD: RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
};
