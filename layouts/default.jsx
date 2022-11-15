// ./layouts/default.jsx

import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import UserForm from "../components/UserForm";
import { useUserDispatch, useUserState } from "../modules/AppContext";

const Layout = ({ children }) => {
  const userState = useUserState();
  const setUserState = useUserDispatch();

  useEffect(() => {
    // send identify event with gloal user state data
    window.analytics.identify(userState.id, {
      ...userState,
    });
  }, [userState]);

  useEffect(() => {
    // get local user info
    let localUserInfo = localStorage.localUserInfo || "{}";

    // function to get personyze user_data (containing `country` data)
    let i = 0;
    const getPersonyzeData = () => {
      if (window.personyze && window.personyze.user_data?.country) {
        let user_data = window.personyze.user_data;

        setUserState({
          ...JSON.parse(localUserInfo),
          ...userState,
          ...user_data,
        });
        console.log({ user_data, userState });
        return;
      }
      // if personyze dat is not available (not loaded)
      // try again up to 20 times
      i++ < 20 && setTimeout(() => getPersonyzeData(), 400);
    };

    getPersonyzeData();
  }, []);

  return (
    <>
      <SiteHeader />
      <main> {children} </main>
      <UserForm />
    </>
  );
};

export default Layout;
