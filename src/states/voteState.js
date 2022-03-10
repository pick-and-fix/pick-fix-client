import { atom } from "recoil";

export const voteState = atom({
  key: "votes",
  default: {},
});
