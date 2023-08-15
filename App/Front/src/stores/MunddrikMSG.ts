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
        let csv = resp.data.files;
        csv.forEach((element: string) => {
          const substr = element.split('.')[0];
          this.Files.push(substr);
        });
      })
    },
    async loadFile(name: string){
      if(this.AllMessage){
        this.AllMessage=[];
      }
      await axios.get(`http://localhost:8080/getFile/${name}`).then((resp)=>{
        let data = resp.data.data;
        if(data != "Not Found"){
          this.MsgSize = data.length;
          data.forEach((element: ArrayLike<unknown> | { [s: string]: unknown; }) =>{
            this.AllMessage.push(Object.values(element).toString());
          })
          if (this.first) {
            this.roll();
            this.first = false;
          }
        }
        this.Files=[];
        this.loadDataFiles();
      })
    },    
    roll() {
      const rand = Math.round(Math.random() * this.AllMessage.length);
      this.Message = this.AllMessage[rand];
      this.UsedMsg.push(this.AllMessage[rand]);
      this.AllMessage.splice(rand, 1);
      if(!this.Message)
      {
        this.roll();
      }
      if(this.UsedMsg.length >= (this.MsgSize * 2) / 3){
        this.AllMessage.push(...this.UsedMsg);
        this.UsedMsg=[];
      }
    },
    haeld() {
      let rand = Math.round((Math.random() * 100) % 2);
      this.Message = this.Munddrik[rand ? 0 : 1];
    },
  },
});
