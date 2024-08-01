export const clockIn = () => {
  return {
    type: "CLOCKIN",
  };
};

export const clockOut = () => {
  return {
    type: "CLOCKOUT",
  };
};

export const setUser = (userData) => {
  return {
    type: "SETUSER",
    payload: userData,
  };
};

export const resetUser = () => {
  return {
    type: "RESETUSER",
  };
};
