// ./components/UserForm.jsx

import { useEffect, useState } from "react";
import { useUserDispatch, useUserState } from "../modules/AppContext";

const UserForm = () => {
  // global user state
  const userState = useUserState();
  const setUser = useUserDispatch();

  // form state
  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // fumction to save user info to global state and localStorage
  const saveUserInfo = (e) => {
    e.preventDefault();

    // generate dummy ID
    let id = email.substring(0, 3) + Math.floor(Math.random() * 100000);
    
    setUser({ ...userState, id, name, email });
    localStorage.localUserInfo = JSON.stringify({ id, name, email });

    // hide form
    setActive(false);
  };

  // get user info from localStorage and show form if no user data exists
  useEffect(() => {
    let localUserInfo = localStorage.localUserInfo;
    if (!localUserInfo) {
      setActive(true);
      return;
    }
    // set global user state if user info exists in localStorage
    setActive(false);
    setUser({ ...userState, ...JSON.parse(localUserInfo) });
  }, []);

  return !active ? null : (
    <>
      <div className="form-cont fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-slate-800 bg-opacity-40 z-10">
        <form
          onSubmit={saveUserInfo}
          className=" min-w-[34rem] bg-white px-8 py-6 rounded-xl"
        >
          <div className="form-control flex flex-col gap-2 my-4">
            <label htmlFor="name">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              type="text"
              className="form-input rounded-lg"
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2 my-4">
            <label htmlFor="email">Your email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              className="form-input rounded-lg"
              required
            />
          </div>
          <button type="submit" className="cta">
            Continue shopping
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
