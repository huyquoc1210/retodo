import Stack, { type StackOwnProps } from '@mui/material/Stack';

const FormSpacing = (props: StackOwnProps) => {
  const { children, ...rest } = props;
  return (
    <Stack direction="column" spacing={2} {...rest}>
      {children}
    </Stack>
  );
};

export default FormSpacing;
