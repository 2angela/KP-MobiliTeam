export const inputFormat = {
  region: "",
  cluster: "",
  site: "",
  tower: "",
  rigger: "",
  tag: "",
  panoramic: [{ 0: "" }, { 30: "" }, { 60: "" }, { 90: "" }, { 120: "" }],
  antenna: {
    photo: [{ H1: "" }, { T1: "" }, { H2: "" }, { T2: "" }],
    input: [{ H1: "" }, { T1: "" }, { H2: "" }, { T2: "" }],
  },
  azimuth: {
    photo: [
      { 0: "" },
      { 90: "" },
      { 270: "" },
      { V1: "" },
      { V2: "" },
      { V3: "" },
    ],
    input: [{ 0: "" }, { 90: "" }, { 270: "" }, { TS2: "" }],
  },
  tilting: {
    photo: [
      { M1: "" },
      { E1: "" },
      { M2: "" },
      { E2: "" },
      { M3: "" },
      { E3: "" },
    ],
    input: [
      { M1: "" },
      { E1: "" },
      { M2: "" },
      { E2: "" },
      { M3: "" },
      { E3: "" },
    ],
  },
  rfa: {
    before: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
    after: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
  },
  rfm: {
    before: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
    after: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
  },
  rfe: {
    before: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
    after: {
      photo: [{ S1: "", S2: "", S3: "" }],
      input: [{ S1: "", S2: "", S3: "" }],
    },
  },
};
