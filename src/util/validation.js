export function validateEmail(email) {
  return /^.+@.+\..+$/.test(email);
}

export function validatePhoneNumber(phoneNumber) {
  return /^[+]{1}[0-9]{1,4}(\s[0-9]|[0-9])+$/.test(phoneNumber);
}
