import React from "react";
import { Route } from "react-router-dom";
import indexRoutes from "./routes";
import LoadingAnimation from "./components/LoadingAnimation";

const ROOT = (props) => {
  return (
    <>
      {indexRoutes.map((prop, key) => {
        if (prop.name === "MarketplaceApplications") {
          return <Route to={prop.path} component={prop.component} key={key} />;
        } else
          return (
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
      })}
      <LoadingAnimation />
    </>
  );
};

export default ROOT;
