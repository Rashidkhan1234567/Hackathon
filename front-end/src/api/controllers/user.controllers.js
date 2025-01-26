import userRoutes from "../routes/user.routes";

const login = async (payload) => {
  try {
    const response = await fetch(userRoutes.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (payload) => {
  try {
    const response = await fetch(userRoutes.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export { login, register };
