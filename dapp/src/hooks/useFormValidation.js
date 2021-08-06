import { useCallback, useMemo } from 'react';

export default function useFormValidation({
  errors = {},
  touched,
  isValid,
  setTouched = () => {},
  setFieldValue = () => {}
}) {
  const changeValue = useCallback(
    (field, value) => {
      setTouched({
        ...touched,
        [field]: true
      });
      setFieldValue(field, value);
    },
    [touched, setTouched]
  );

  const isValidForm = useMemo(
    () =>
      isValid ? true : !Object.keys(errors).length &&
        !!Object.keys(touched).length,
    [isValid, errors, touched]
  );

  const getErrorFromField = useCallback((field) =>
    errors[field] && touched[field] ? errors[field] : null
  , [errors, touched]);

  return [isValidForm, changeValue, getErrorFromField];
}
