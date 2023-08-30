import { defineStore } from "pinia";
import  {useCookies}  from "vue3-cookies";
import { instance } from '../network/network.ts'
import { message } from "../objects/message.ts";

export interface msg {
  Message: string;
  AllMessage: message[];
  Munddrik: string[];
  UsedMsg: message[];
  Files: string[];
  MsgSize: number;
  First: boolean;
  CurrentFile: string;
  Saved: boolean;
}
const $cookies = useCookies();

export const useMunddrikStore = defineStore({
  id: "Munddrik",
  state: (): msg => ({
    Message: "",
    AllMessage: [],
    UsedMsg: [],
    Files: [],
    MsgSize: 0,
    Munddrik: ["Bund din drik!!!!", "Du vælger en som skal bunde!!!!"],
    First: true,
    CurrentFile: "",
    Saved: false,
  }),
  actions: {
    async loadDataFiles() {
      await instance.get("/getFiles").then((resp)=> {
        let csv = resp.data.files;
        csv.forEach((element: string) => {
          const substr = element.split('.')[0];
          this.Files.push(substr);
        });
      })
    },
    loadCookie(){
      const cookieSet = $cookies?.cookies.get("MsgFile")
      if(cookieSet) {
        this.loadFile(cookieSet);
      }
      else{
        this.loadDataFiles();
      }
    },
    async loadFile(name: string){
      if(this.AllMessage){
        this.AllMessage= [];
      }
      await instance.get(`/getFile/${name}`).then((resp)=>{
        let data = resp.data.data;
        if(data != "Not Found"){
          this.MsgSize = data.length;
          let index=0;
          data.forEach((element: ArrayLike<unknown> | { [s: string]: unknown; }) =>{
            let pushMsg: message = {id: 0, value: ""};
            pushMsg.id=index;
            pushMsg.value = Object.values(element).toString();
            this.AllMessage.push(pushMsg);
            index++;
          })
          this.CurrentFile = name
          if (this.First) {
            this.roll();
            this.First = false;
          }

          $cookies?.cookies.set("MsgFile", name, '7d')
        }
        this.Files=[];
        this.loadDataFiles();
      })
    },   
    async EditFile(name: string) {
      if(this.AllMessage){
        this.AllMessage= [];
      }
      await instance.get(`/getFile/${name}`).then((resp)=>{
        let data = resp.data.data;
        if(data != "Not Found"){
          this.MsgSize = data.length;
          let index=0;
          data.forEach((element: ArrayLike<unknown> | { [s: string]: unknown; }) =>{
            let pushMsg: message = {id: 0, value: ""};
            pushMsg.id=index;
            pushMsg.value = Object.values(element).toString();
            this.AllMessage.push(pushMsg);
            index++;
          })}
      })
    },
    async SaveEdits(){
      let saveState = false;
      await instance.post(`/saveEdits`, {
        data: this.AllMessage,
      }).then((resp) => {
        saveState = resp.data.data;
      })
      return saveState;
    },
    roll() {
      const rand = Math.round(Math.random() * this.AllMessage.length);
      this.Message = this.AllMessage[rand].value == null ? "" : this.AllMessage[rand].value as string;
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
