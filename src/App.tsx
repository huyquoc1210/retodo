import { useEffect } from 'react';

// Reset css
import CssBaseline from '@mui/material/CssBaseline';

// Error boundary
import ErrorBoundary from 'pages/Error/ErrorBoundary';

// Router
import Router from 'router';

// Config
import config from 'config';

// I18n
import 'locales';

// Dayjs
import 'dayjs/locale/vi';

// Providers
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertDialogProvider } from 'contexts/AlertDialog';
import { AuthProvider } from 'contexts/Auth';
import { NotificationProvider } from 'contexts/Notification';
import { SettingsProvider } from 'contexts/Settings';
import { ThemeProvider } from 'contexts/Theme';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

// Redux
import { store } from 'store';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    console.log(`Retodo (version: ${config.VERSION}) - Copyright © 2023 by QH`);
  }, []);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SettingsProvider>
              <ThemeProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <NotificationProvider>
                    <AlertDialogProvider>
                      <CssBaseline enableColorScheme />
                      <ErrorBoundary>
                        <Router />
                      </ErrorBoundary>
                    </AlertDialogProvider>
                  </NotificationProvider>
                </LocalizationProvider>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
