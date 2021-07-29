import { storage, StorageKey } from './storage';

export const saveFcmToken = (token) => {
  storage.save({
    key: StorageKey.fcmToken,
    data: token,
    // expires: 1000 * 3600,
  });
};

export const getFcmToken = async () => {
  return new Promise((resolve, reject) => {
    return storage
      .load({ key: StorageKey.fcmToken })
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
