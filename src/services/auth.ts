import Endpoints from 'constants/endpoints';
import type { User } from 'types/auth';
import type { HttpResponse } from 'types/http';
import HttpClient from 'utils/HttpClient';

// Sign In
interface SignInPayload {
  username: string;
  password: string;
}
interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
export const signIn = async (payload: SignInPayload) => {
  return HttpClient.post<SignInPayload, HttpResponse<SignInResponse>>(
    Endpoints.auth.login,
    payload
  );
};

// Get user profile
export const getUser = async () => {
  return HttpClient.get<HttpResponse<User>>(Endpoints.auth.profile);
};
