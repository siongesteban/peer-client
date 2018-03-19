const validate = (values, fields, formName) => {
  const errors = {};

  fields.forEach(field => {
    if (!values[field] || /^ *$/.test(values[field])) {
      errors[field] = 'Required';
    }
  });

  // if (
  //   values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address';
  // }

  if (formName === 'register' || formName === 'profileUpdate') {
    if (
      values.username &&
      /\s/.test(values.username)
    ) {
      errors.username = `Username must not contain spaces`
    }

    if (
      values.password &&
      values.password.length < 8
    ) {
      errors.password = 'Password must be 8 characters long';
    }
  
    if (
      values.newPassword &&
      values.newPassword.length < 8
    ) {
      errors.newPassword = 'Password must be 8 characters long';
    }
  }

  if (
    values.newPassword &&
    values.newPassword !== values.confirmPassword
  ) {
    errors.confirmPassword = 'New passwords do not match'
  }

  return errors;
};

export default validate;