import { useState } from 'react';
import type { DispatchAction, FCC } from 'types/react';

interface Props {}

const Test: FCC = (props) => {
  const { children } = props;

  const [state, setState] = useState<number>(0);

  return (
    <div>
      <h1>Test</h1>
      <Component onSetState={setState} />
    </div>
  );
};

interface CProps {
  onSetState: DispatchAction<number>;
}
const Component = (props: CProps) => {
  const { onSetState } = props;
  return (
    <div
      onClick={() => {
        onSetState(1);
      }}
    ></div>
  );
};

export default Test;

// Dry
