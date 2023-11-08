import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthenticationContext from "../context/Auth/userContext";

const PersistenLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useContext(AuthenticationContext);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && (persist === "true" ? true : false)
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //   // eslint-disable-next-line
  // }, [isLoading]);

  return (
    <>{!persist == "true" ? <Outlet /> : isLoading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : <Outlet />}</>
  );
};

export default PersistenLogin;
