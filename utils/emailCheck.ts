function isEmailValid(email: string) {
  let emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

export default isEmailValid;
