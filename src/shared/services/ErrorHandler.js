const log = (obj, message = '') => {
  // Logger.log(`[ErrorHandler] ${message}`, obj);
};

const CODE_TYPE = {
  NONE: 0,
  SUCCESS: 1,
  INVALID: 2,
  DUPLICATE: 3,
  UNKNOWN: 4, // Something went wrong.
  UNAUTHORIZED: 5,
  EMPTY: 6,
  NOT_FOUND: 7,
};

const processNetworkError = () => {};

const processResponseError = (status, code, message) => {
  if (status === 200) {
    switch (code) {
      case CODE_TYPE.UNKNOWN:
        return { message };

      case CODE_TYPE.SUCCESS:
      case CODE_TYPE.NONE:
      default:
        return null;
    }
  }

  if (status === 401) {
    // UNAUTHORIZED
  }

  if (status === 400) {
    // BAD REQUEST
    return { messageError: message };
  }

  return { message };
};

export const ErrorHandler = (response, error) => {
  log({ response, error }, 'Parse Error');

  if (response) {
    const status = response.status;
    switch (status) {
      case 200:
      default:
        const { codeStatus, message, codeNumber, data } = response.data;
        response = processResponseError(
          codeNumber ?? status,
          codeStatus,
          message,
        );
        break;
    }
  }

  return response;
};
