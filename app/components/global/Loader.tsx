import { useEffect, useState } from "react";
import { loaderInfo } from "../../__services";

export const Loader = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    loaderInfo.subscribe((observer) => setState(observer));
  }, []);

  return (
    <div
      style={state ? { display: "flex" } : { display: "none" }}
      className="ls-spinner-container"
    >
      <span className="loader"></span>
      <p>chargement...</p>
    </div>
  );
};
