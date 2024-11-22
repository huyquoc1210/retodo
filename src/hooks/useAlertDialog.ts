import Context from 'contexts/AlertDialog';
import { useContext } from 'react';

const useAlertDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('AlertDialog context must be used within a Provider');
  }

  return context;
};

export default useAlertDialog;
