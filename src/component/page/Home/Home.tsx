import * as React from 'react';
import {useHistory} from 'react-router-dom';

export default () => {
  const history = useHistory();
  return (
    <div>
      <div>Home</div>
      <div>
        <button type="button" onClick={() => { history.push('/character'); }}>
          Create Character
        </button>
      </div>
    </div>
  );
};
