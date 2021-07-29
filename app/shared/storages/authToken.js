import { storage, StorageKey } from './storage';

export const saveAuthToken = (token) => {
  storage.save({
    key: StorageKey.authToken,
    data: token,
    // expires: 1000 * 3600,
  });
};

export const getAuthToken = async () => {
  return new Promise((resolve, reject) => {
    return storage
      .load({ key: StorageKey.authToken })
      .then((res) => resolve(res))
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        // console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
        return resolve(null);
      });
  });
};
