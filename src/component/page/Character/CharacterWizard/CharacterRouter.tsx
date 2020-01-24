import * as React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import CharacterNew from './CharacterNew';
import CharacterQuickstart from './CharacterQuickstart';


export default () => {
  const match = useRouteMatch();

  return (
    <>
      aaaa
      <Switch>
        <Route exact path={`${match.path}`}>
          <CharacterNew />
        </Route>
        <Route path={`${match.path}/quickstart`}>
          <CharacterQuickstart />
        </Route>
      </Switch>
    </>
  );
};
