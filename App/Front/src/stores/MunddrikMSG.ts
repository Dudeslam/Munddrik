import axios from "axios";
import { defineStore } from "pinia";
axios.defaults.withCredentials = false;
export interface msg {
  Message: string;
  AllMessage: string[];
  Munddrik: string[];
  UsedMsg: string[];
  Files: string[];
  MsgSize: number;
  first: boolean;
}

export const useMunddrikStore = defineStore({
  id: "Munddrik",
  state: (): msg => ({
    Message: "",
    AllMessage: [],
    UsedMsg: [],
    Files: [],
    MsgSize: 0,
    Munddrik: ["Bund din drik!!!!", "Du vælger en som skal bunde!!!!"],
    first: true,
  }),
  actions: {
    async loadDataFiles() {
      await axios.get("http://localhost:8080/getFiles").then((resp)=> {
        let csv = resp.data;
        csv.forEach((element: { [s: string]: unknown; } | ArrayLike<unknown>) => {
          this.Files.push(Object.values(element).toString());
        });
      })
    },
    async loadFile(name: string){
      await axios.get(`http://localhost:8080/getFile/${name}`).then((resp)=>{
        let data = resp.data;
        this.MsgSize = data.length;
        data.forEach((element: ArrayLike<unknown> | { [s: string]: unknown; }) =>{
          this.AllMessage.push(Object.values(element).toString());
        })
        if (this.first) {
          this.roll();
          this.first = false;
        }
      })
    },    
    roll() {
      const rand = Math.round(Math.random() * this.AllMessage.length);
      this.Message = this.AllMessage[rand];
      this.UsedMsg.push(this.AllMessage[rand]);
      delete this.AllMessage[rand];
      if(this.UsedMsg.length >= this.MsgSize/2){
        this.AllMessage = this.AllMessage.concat(this.UsedMsg);
      }
    },
    haeld() {
      let rand = Math.round((Math.random() * 100) % 2);
      this.Message = this.Munddrik[rand ? 0 : 1];
    },
  },
});
