const checkValidity = (evt) => {
  const { name, validationMessage } = evt.target;

  if (!evt.target.validity.valid) {
    return { [name]: validationMessage };
  }
  return null;
};

export default checkValidity;
