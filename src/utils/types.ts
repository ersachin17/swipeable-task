// src/types.ts
export interface RawRandomUser {
  login: { uuid: string };
  name: { first: string; last: string };
  location: { city: string; country: string };
  picture: { large: string };
  id:string
}

// export interface User {
//   id: string;
//   first: string;
//   last: string;
//   fullName: string;
//   city: string;
//   country: string;
//   avatar: string;
//   raw?: RawRandomUser;
// }
export interface User {
  id: string;
  name: string;
  picture: string;
  location: string;
}
