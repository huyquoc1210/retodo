import config from 'config';
import useRefresh from 'hooks/useRefresh';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { getUser, signIn } from 'services/auth';
import type { User } from 'types/auth';
import type { FCC } from 'types/react';
import LocalStorage from 'utils/LocalStorage';

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  login: Login;
  logout: VoidFunction;
}

type Login = (payload: Parameters<typeof signIn>[0]) => Promise<void>;

type Action =
  | { type: 'AUTHORIZED'; pyalod: { user: User } }
  | { type: 'UNAUTHORIZED' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'AUTHORIZED': {
      const { user } = action.pyalod;
      return {
        isInitialized: true,
        isAuthenticated: true,
        user,
      };
    }
    case 'UNAUTHORIZED': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'LOGOUT': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null,
      };
    }
    default:
      return { ...state };
  }
};

const AuthContext = createContext<AuthContextValue | null>(null);

if (config.__DEV__) {
  AuthContext.displayName = 'AuthContext';
}

const AuthProvider: FCC = (props) => {
  const { children } = props;

  const [refresh, refetch] = useRefresh();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = LocalStorage.get('accessToken');

    if (accessToken) {
      getUser()
        .then((response) => {
          const { data } = response;
          dispatch({ type: 'AUTHORIZED', pyalod: { user: data } });
        })
        .catch(() => {
          dispatch({ type: 'UNAUTHORIZED' });
        });
    } else {
      dispatch({ type: 'UNAUTHORIZED' });
    }
  }, [refresh]);

  const login: Login = useCallback(
    async (payload) => {
      const { data } = await signIn(payload);
      const { accessToken, refreshToken } = data;

      LocalStorage.set('accessToken', accessToken);
      LocalStorage.set('refreshToken', refreshToken);

      refetch();
    },
    [refetch]
  );

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const context = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
