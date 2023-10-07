import { FORM_ERRORS } from "./Constants";

function validateEmail(email) {
  return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validateUserName(username) {
  return /^([a-zA-Z\d_-]){5,}$/.test(username);
}

function validatePassword(password) {
  return /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

export default function validateForm(
  userName,
  email,
  password,
  confirmPassword,
  country
) {
  let errors = {};
  if (!validateEmail(email)) errors.email = FORM_ERRORS.EMAIL_ERROR;
  if (!validateUserName(userName))
    errors.userName = FORM_ERRORS.USERNAME_PASSWORD;
  if (!validatePassword(password))
    errors.password = FORM_ERRORS.PASSWORD_LENGTH_ERROR;
  if (password !== confirmPassword)
    errors.confirmPassword = FORM_ERRORS.PASSWORD_NOT_MATCH_ERROR;
  if (!country) {
    errors.country = FORM_ERRORS.COUNTRY_ERROR;
  }
  return errors;
}
