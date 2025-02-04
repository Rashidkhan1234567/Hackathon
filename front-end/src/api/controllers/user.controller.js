import userRoutes from "../routes/user.routes";

const login = async (payload) => {
    const response = await fetch(userRoutes.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...payload})
    });
  
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  };

const register = async (data) => {
  try {
    const response = await fetch(userRoutes.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }

    return result;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

const loan_request = async (payload) => {
  try {
    console.log(payload);
    const response = await fetch(userRoutes.loan_request, {
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

const forget_password = async (payload) => {
  const response = await fetch(userRoutes.forgetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...payload}),
  });

  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export { login, register, loan_request, forget_password };
