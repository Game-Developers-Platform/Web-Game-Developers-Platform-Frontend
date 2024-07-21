export const validateUrl = (
  url: string,
  regex: RegExp,
  fieldName: string
): string => {
  if (url === "") return "";
  if (!url) {
    return `${fieldName} url is required.`;
  }
  if (!regex.test(url)) {
    return `Invalid ${fieldName} url format.`;
  }
  return "";
};

export const validateName = (name: string) => {
  const nameRegex = /^(?!^\s|\s$)[A-Za-z0-9\s]{2,30}$/;
  return nameRegex.test(name)
    ? ""
    : "Name must be between 2 and 30 characters long and contain only letters, numbers, and spaces.";
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]{3,55}@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? ""
    : "Email must be between 3 and 55 characters long and in a valid format.";
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
  return passwordRegex.test(password)
    ? ""
    : "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.";
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
) => {
  return confirmPassword === password ? "" : "Passwords do not match.";
};

export const validateBirthdate = (birthdate: string) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  if (isNaN(birthDate.getTime())) {
    return "Invalid date.";
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 16 ? "" : "You must be at least 16 years old.";
};

export const validateGameName = (name: string) => {
  const nameRegex = /^(?!^\s|\s$)[A-Za-z0-9\s]{2,30}$/;
  return nameRegex.test(name)
    ? ""
    : "Name must be between 2 and 30 characters long and contain only letters, numbers, and spaces.";
};

export const validateDescription = (description: string) => {
  const descriptionRegex = /^(?!^\s|\s$)[A-Za-z0-9\s]{2,300}$/;
  return descriptionRegex.test(description)
    ? ""
    : "Description must be between 2 and 300 characters long and contain only letters, numbers, and spaces.";
};

export const validatePrice = (price: string) => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price) ? "" : "Invalid price format.";
};
