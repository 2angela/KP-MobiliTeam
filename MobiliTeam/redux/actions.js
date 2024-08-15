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

export const setUser = (data) => {
  return {
    type: "SETUSER",
    payload: data,
  };
};

export const resetUser = () => {
  return {
    type: "RESETUSER",
  };
};

export const saveTask = (data) => {
  return {
    type: "SAVETASK",
    payload: data,
  };
};

export const saveBBM = (data) => {
  return {
    type: "SAVEBBM",
    payload: data,
  };
};

export const saveCOP = (data) => {
  return {
    type: "SAVECOP",
    payload: data,
  };
};

export const saveAOR = (data) => {
  return {
    type: "SAVEAOR",
    payload: data,
  };
};

export const saveAOR46 = (data) => {
  return {
    type: "SAVEAOR46",
    payload: data,
  };
};

export const saveSite = (data) => {
  return {
    type: "SAVESITE",
    payload: data,
  };
};
