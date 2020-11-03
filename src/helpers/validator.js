import validator from "validator";
import isEmpty from "is-empty";

const transactionValidator = (data) => {
  const { payee_name, contribution_date, amount } = data;
  const errors = {};
  const trimmedPayee = payee_name.trim();
  const trimmedDate = contribution_date.trim();
  const trimmedAmount = amount.trim();
  const today = new Date();
  const date = trimmedDate.split("-").map((x) => parseInt(x));

  if (validator.isEmpty(trimmedPayee) || trimmedPayee.split(" ").length !== 2)
    errors.payee_name = "Payee's first and last name is required";

  if (
    validator.isEmpty(trimmedDate) ||
    date[0] !== today.getFullYear() ||
    date[1] !== today.getMonth() + 1 ||
    date[2] !== today.getDate()
  )
    errors.contribution_date = "A current contribution date is required";

  if (validator.isEmpty(trimmedAmount) || trimmedAmount < 50)
    errors.amount = "A minimum amount of NGN50 is required";

  return { errors, isValid: isEmpty(errors) };
};

const updateTransactionValidator = (data) => {
  const { payee_name, amount } = data;
  const errors = {};
  const trimmedPayee = payee_name.trim();
  const trimmedAmount = amount.trim();

  if (validator.isEmpty(trimmedPayee) || trimmedPayee.split(" ").length !== 2)
    errors.payee_name = "Payee's first and last name is required";

  if (validator.isEmpty(trimmedAmount) || trimmedAmount < 50)
    errors.amount = "A minimum amount of NGN50 is required";

  return { errors, isValid: isEmpty(errors) };
};

export { transactionValidator, updateTransactionValidator };
