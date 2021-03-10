export const getToken = () => localStorage.getItem("navers_token");
export const login = (token) =>
  localStorage.setItem("navers_token", token);
export const logout = () => localStorage.removeItem("navers_token");
export const isAuthenticated = () =>
  localStorage.getItem("navers_token") !== null;