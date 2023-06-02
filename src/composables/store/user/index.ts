import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    };
  },
  persist: process.client && {
    storage: persistedState.localStorage,
  },
});
