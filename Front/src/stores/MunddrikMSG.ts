import { inject } from "vue";
import { defineStore } from "pinia";
export interface msg {
  Message: string;
  AllMessage: string[];
  Munddrik: string[];
  first: boolean;
}

export const useMunddrikStore = defineStore({
  id: "Munddrik",
  state: (): msg => ({
    Message: "",
    AllMessage: [],
    Munddrik: ["Bund din drik!!!!", "Du vælger en som skal bunde!!!!"],
    first: true,
  }),
  actions: {
    async loadMovies() {
      await fetch("./Munddrik.txt").then((x) => x.text);
      csv.forEach((element: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        this.AllMessage.push(Object.values(element).toString());
      });
      const valuest = Object.values(csv);
      if (this.first) {
        this.roll();
        this.first = false;
      }
    },
    roll() {
      const rand = Math.round(Math.random() * this.AllMessage.length);
      this.Message = this.AllMessage[rand];
    },
    haeld() {
      let rand = Math.round((Math.random() * 100) % 2);
      this.Message = this.Munddrik[rand ? 0 : 1];
    },
  },
});
