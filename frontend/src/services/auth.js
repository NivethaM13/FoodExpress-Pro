export const saveUser = (data) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("role", data.role);
};

export const logout = () => {
  localStorage.clear();
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};