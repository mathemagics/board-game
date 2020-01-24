import * as React from 'react';
import {useHistory} from 'react-router-dom';

export default () => {
  const history = useHistory();

  return (
    <div>
      <button type="button">Standard</button>
      <button type="button" onClick={() => { history.push('/character/quickstart'); }}>
        Quickstart
      </button>
      <button type="button">Random</button>
    </div>
  );
};
