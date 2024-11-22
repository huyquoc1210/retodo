import { useCallback, useState } from 'react';
import { sleep } from 'utils/misc';

interface Props {
  onClose?: VoidFunction;
}

const useDialog = (props: Props = {}) => {
  const { onClose } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(async () => {
    setIsOpen(false);
    await sleep(450);
    onClose?.();
  }, [onClose]);

  return { isOpen, open, close };
};

export default useDialog;
