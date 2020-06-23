import * as React from "react";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

export default () => {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  const loginWithGoogle = () => {
    return firebase.login({ provider: "google", type: "popup" });
  };

  if (!isLoaded(auth)) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <div>
        {isEmpty(auth) ? (
          <button type="button" onClick={loginWithGoogle}>
            Login With Google
          </button>
        ) : (
          <Redirect to={{ pathname: "home" }} />
        )}
      </div>
    </div>
  );
};
