import * as React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import CharacterNew from './CharacterNew';
import CharacterQuickstart from './CharacterQuickstart';
import CharacterStandard from './CharacterStandard';
import CharacterRandom from './CharacterRandom';


export default () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <CharacterNew />
      </Route>
      <Route path={`${match.path}/quickstart/:charID`}>
        <CharacterQuickstart />
      </Route>
      <Route path={`${match.path}/standard`}>
        <CharacterStandard />
      </Route>
      <Route path={`${match.path}/random`}>
        <CharacterRandom />
      </Route>
    </Switch>
  );
};
