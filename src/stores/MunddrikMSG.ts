import { inject} from 'vue'
import { defineStore } from 'pinia'

export interface msg{
  Message: string,
  AllMessage: string[],
  Munddrik: string[]
}
const $papa = inject("$papa");
export const useMunddrikStore = defineStore({
  id: "Munddrik",
  state: (): msg => ({
    Message: "",
    AllMessage: [],
    Munddrik: ["Bund din drik!!!!", "Du vælger en som skal bunde!!!!"],
  }),
  actions:{
    loadMovies(){
      console.log("hello")
      console.log($papa.parse("./Munddrik.csv"))
    },
    roll(){
      const rand = Math.round((Math.random()*this.AllMessage.length));
      console.log(rand)
      this.Message = this.AllMessage[rand]
    },
    haeld(){
      const rand = Math.round((Math.random()*100) % 2);
      this.Message = this.Munddrik[rand];
    },
  },

})
