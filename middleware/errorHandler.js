export const notFound = 'notFound';
export const validationError = 'ValidationError';
export const castError = 'CastError';

// ! Updated the code in here to be a bit slicker. Now it will return a simplified error object to the f/e,
// ! which I can display right away.
export default function errorHandler(err, _req, res, next) {
  console.log('🤖 An Error Happened', err.name, err.message);
  console.log(err);

  // ! This will shorten the object I send back to the frontend, to be less nested and stuff.
  if (err.name === validationError) {
    const customErrors = {};

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message;
    }

    // ! This is basically tossing out everything except the message for each field
    return res.status(422).send({
      message: 'Form Validation Errors',
      errors: customErrors,
    });
  }

  // ! Handles any other error
  if (err.name === castError || err.message === notFound) {
    return res.status(404).send({ message: 'Not Found ' });
  }

  res.status(500).send({ message: 'WORST ERROR EVER' });
  next(err);
}
