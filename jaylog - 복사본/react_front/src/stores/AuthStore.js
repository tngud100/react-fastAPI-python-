import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";

const AuthStore = () => {
  const [loginUser, setLoginUser] = useState(undefined);
  const setLoginUserByToken = useCallback((accessToken) => {
    try {
      const decodedAccessToken = jwtDecode(accessToken);
      setLoginUser(decodedAccessToken);
    } catch (e) {
      setLoginUser(null);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setLoginUserByToken(accessToken);
  }, []);

  useEffect(() => {
    if (loginUser === null) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }, [loginUser]);

  return {
    loginUser,
    setLoginUser,
    setLoginUserByToken,
  };
};

export default AuthStore;
