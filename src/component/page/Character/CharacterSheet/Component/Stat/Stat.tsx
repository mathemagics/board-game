import * as React from 'react';

interface StatProps {
  name: string,
  value: string,
}

export default ({name, value}: StatProps) => (
  <div>
    <div>{name}</div>
    <div>{value}</div>
  </div>
);
