import React from 'react';

export const useForm = (inputValues) => {
  const [values, setValues] = React.useState(inputValues);
  const [inputErrors, setInputErrors] = React.useState(inputValues);
  const [isInvalid, setIsInvalid] = React.useState(inputValues);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const checkValidity = (evt) => {
    const { name, validationMessage } = evt.target;

    if (!evt.target.validity.valid) {
      setIsInvalid({ ...isInvalid, [name]: true });
      setInputErrors({ ...inputErrors, [name]: validationMessage });
    } else {
      setIsInvalid({ ...isInvalid, [name]: false });
    }
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    checkValidity(evt);
  };

  return {
    values,
    handleChange,
    setValues,
    isFormValid,
    setIsFormValid,
    isInvalid,
  };
};
