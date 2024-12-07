// FOR SIGNUP
export const signup = (user) => {
    return fetch(`/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // FOR SIGN IN
  export const signin = (user) => {
    return fetch(`/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // authenticatio and to store token in localstorage
  export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };
  
  // redirect user by role after authenticatio
  export const isAuthenticated = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  
  // signout
  export const signout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt", JSON.stringify("jwt"));
  
      return fetch(`/api/signout`, {
        method: "POST",
      })
        .then((res) => {
          console.log("signout", res);
          next();
        })
        .catch((err) => console.log(err));
    }
  };