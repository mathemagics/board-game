import * as React from 'react';

interface TrackProps {
  name: string,
  count: number
}

export default ({name, count}: TrackProps) => {
  const countArray = [...Array(count)];
  return (
    <div>
      <div>{name}</div>
      <div>
        {countArray.map((_val, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>o</div>
        ))}
      </div>
    </div>
  );
};
