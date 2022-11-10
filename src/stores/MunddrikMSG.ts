import { inject} from 'vue'
import { defineStore } from 'pinia'
import csv from './Munddrik.tsv'
export interface msg{
  Message: string,
  AllMessage: string[],
  Munddrik: string[],
  first: boolean
}
const $papa = inject("$papa");
export const useMunddrikStore = defineStore({
  id: "Munddrik",
  state: (): msg => ({
    Message: "",
    AllMessage: [],
    Munddrik: ["Bund din drik!!!!", "Du vælger en som skal bunde!!!!"],
    first: true
  }),
  actions:{
    async loadMovies(){
      await fetch('./Munddrik.txt').then(x => x.text)
      csv.forEach(element => {
        this.AllMessage.push(Object.values(element).toString())
      });
      const valuest = Object.values(csv)
      console.log(this.AllMessage)
      if(this.first){
        this.roll()
        this.first = false;
      }
    },
    roll(){
      const rand = Math.round((Math.random()*this.AllMessage.length));
      this.Message = this.AllMessage[rand]
    },
    haeld(){
      let rand = Math.round((Math.random()*100)%2);
      this.Message = this.Munddrik[rand ? 0 : 1];
    },
  },

})
