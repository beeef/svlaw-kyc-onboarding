export const saveAccessToken = (token) =>
  sessionStorage.setItem("access_token", token);

export const getAccessToken = () => sessionStorage.getItem("access_token");
