import { axios } from '@shared/services/axiosClient';
import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const log = (obj, message = '') => {
  //   Logger.log(`[CodePushProvider] ${message}`, obj);
};

// provide the default query function to your app via the query client
const queryClient = new QueryClient();

export const AxiosApiContext = createContext({});

export const AxiosApiProvider = ({ children }) => {
  //   const dispatch = useDispatch();

  // React useEffect
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React render
  return (
    <AxiosApiContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AxiosApiContext.Provider>
  );
};
