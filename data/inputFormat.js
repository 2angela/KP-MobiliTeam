export const taskFormat = {
  region: "",
  cluster: "",
  site: "",
  type: "",
  category: "",
  description: "",
};

export const bbmFormat = {
  region: "",
  cluster: "",
  site: "",
  volume: "",
  fuel: "",
  runninghour: "",
};

export const copFormat = {
  region: "",
  cluster: "",
  site: "",
  sow: "",
  parentactivity: "",
  activity: "",
  type: "",
  cop: "",
  visitamount: "",
  resource: "",
};

export const siteFormat = {
  site: "",
  name: "",
  latitude: "",
  longitude: "",
  region: "",
  cluster: "",
};

export const aorFormat = {
  region: "",
  cluster: "",
  site: "",
  tower: null,
  rigger: null,
  tag: null,
  panoramic: {
    0: null,
    30: null,
    60: null,
    90: null,
    120: null,
    150: null,
    180: null,
    210: null,
    240: null,
    270: null,
    300: null,
    330: null,
  },
  antenna: {
    photo: { H1: null, T1: null, H2: null, T2: null, H3: null, T3: null },
    input: { H1: "", T1: "", H2: "", T2: "", H3: "", T3: "" },
  },
  azimuth: {
    frequency: "",
    photo: { 0: null, 90: null, 270: null, V1: null, V2: null, V3: null },
    input: { 0: "", 90: "", 270: "" },
  },
  tilting: {
    photo: { M1: null, E1: null, M2: null, E2: null, M3: null, E3: null },
    input: { M1: "", E1: "", M2: "", E2: "", M3: "", E3: "" },
  },
  rfa: {
    before: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
    after: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
  },
  rfm: {
    before: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
    after: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
  },
  rfe: {
    before: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
    after: {
      input: { S1: "", S2: "", S3: "" },
      photo: { S1: null, S2: null, S3: null },
    },
  },
};
