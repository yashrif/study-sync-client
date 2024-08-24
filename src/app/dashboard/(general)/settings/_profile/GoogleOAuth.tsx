'use client';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import { Button } from '@/components/ui/button';
import { googleClientId } from '@/assets/data/dashboard/googleAuth';
import { dbEndpoints, serverEndpoints } from '@/assets/data/api';
import studySyncServer from '@/api/studySyncServer';
import { getAuthToken } from '@/utils/auth';
import { useFetchDataState } from '@/hooks/fetchData';
import { FetchActionType, Preference, Status } from '@/types';
import { useCallback } from 'react';
import studySyncDB from '@/api/studySyncDB';
import Spinner from '@/components/spinner/Spinner';

const GoogleButton = () => {
  const { state, dispatch } = useFetchDataState<null, Preference>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.preferences), []),
  });

  const updateToken = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const response = await studySyncServer.patch(serverEndpoints.google, {
        code: codeResponse.code,
        token: getAuthToken(),
      });
      dispatch({
        type: FetchActionType.FETCH_SUCCESS,
        payload: response.data,
      });
    },
  });

  const deleteToken = async () => {
    state.status = Status.PENDING;
    const response = await studySyncDB.patch(dbEndpoints.preferences, {
      refreshToken: null,
    });
    dispatch({
      type: FetchActionType.FETCH_SUCCESS,
      payload: response.data,
    });
  };
  if (state.status != Status.SUCCESS) return <Spinner />;
  return state.data?.refreshToken ? (
    <Button
      onClick={deleteToken}
      className='max-w-72'
      variant='outline'>
      Disconnect google calender
    </Button>
  ) : (
    <Button
      className='max-w-80'
      onClick={updateToken}
      variant='outline'>
      Connect google calender
    </Button>
  );
};
const GoogleOAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <GoogleButton />
  </GoogleOAuthProvider>
);
export default GoogleOAuth;
