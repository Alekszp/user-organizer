import {regForEmail, regForLetters, regForNumbers} from './regexHelper'

const emailRules = [
  (value) => !!value || "Required",
  (value) => {
    const pattern = regForEmail;
    return pattern.test(value) || "Invalid e-mail.";
  }
]
const nameRules = [
  (value) => !!value || "Required",
  (value) => (value || "").length <= 20 || "Max 20 characters",
  (value) => {
    const pattern = regForLetters;
    return pattern.test(value) || "Only A-Z and a-z letters";
  }
]

const onlyNumberRules = [
    (value) => !!value || "Required",
    (value) => (value || "").length <= 20 || "Max 20 characters",
    (value) => {
      const pattern = regForNumbers;
      return pattern.test(value) || "Only numbers 0-9";
    }
  ]

const passwordRules = [
  (value) => !!value || "Required",
  (value) => (value || "").length >= 6 || "Min 6 characters",
]

export {
  emailRules,
  nameRules,
  passwordRules,
  onlyNumberRules
}
