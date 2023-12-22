function isPasswordValid(password: string): boolean {
  const hasMinimumLength = password.length >= 8;
  const hasLettersAndNumbers = /[a-zA-Z]/.test(password) && /\d/.test(password);

  return hasMinimumLength && hasLettersAndNumbers;
}

export default isPasswordValid;
