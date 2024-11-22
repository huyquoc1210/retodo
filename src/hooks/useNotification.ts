import Notification from 'contexts/Notification';
import { useContext } from 'react';

const useNotification = () => {
  const context = useContext(Notification);

  if (!context) {
    throw new Error('Notification context must be used within a Provider');
  }

  return context;
};

export default useNotification;
