import api from "./api";

export const loginUser = async (email, password) => {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);
  form.append("grant_type", "password");

  const response = await api.post("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};