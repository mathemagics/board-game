import * as React from 'react';
import {Form, Input} from '@rocketseat/unform';

const onBlur = (e: React.FormEvent<HTMLInputElement>) => {
  // graphql call
  console.log((e.target as HTMLInputElement).value);
};

export default () => (
  <Form onSubmit={onBlur}>
    <div>
      <div>name</div>
      <Input name="name" onBlur={onBlur} />
    </div>
    <div>
      <div>species</div>
      <Input name="species" onBlur={onBlur} />
    </div>
    <div>
      <button type="submit">Next</button>
    </div>
  </Form>
)
