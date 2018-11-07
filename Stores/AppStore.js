import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.todoList = [
            "text1", "text2"
        ];
        this.userinput = "";
        this.editBtn = false;
        this.allertMsg ='';
        this.errMsg='';
        this.duplicate=false;
      
    }
    getAll() {
        return this.todoList;
    }
    getEditBtn() {
        return this.editBtn;
    }
    getAllertMsg(){
        return this.allertMsg;
    }
    getErrMsg(){
        return this.errMsg;
    }
    

    getInput() {
        return this.userinput;
    }
    createTodo(userinput) {
        if(userinput == ''){
            this.errMsg = "Input field is empty";
            this.emit("todoAdded");
        }
        else{
        console.log("Input ", this.editBtn);
        this.todoList.push(userinput);
        this.allertMsg="";
        this.emit("todoAdded");
    }}
    checkDuplicates(userinput){
        for(let i=0;i < this.todoList.length;i++){

           if(userinput == this.todoList[i]){
               //this.errMsg="task is already added";
               this.duplicate=true;
              //console.log(true)
               //return true;
               // this.emit("todoAdded");
               
            }
            else{
                this.errMsg="";

            }
            
}

if(this.duplicate == false){
    

    this.createTodo(userinput);
}
else{
    this.errMsg="task is already added";
    this.emit("todoAdded");
}
          
       
       

    }


    deleteToDo(val) {
        delete (this.todoList[val]);
        this.emit("todoDeleted");
    }
    editToDo(index) {
       
        this.userinput = this.todoList[index];
        this.editBtn = true;
        this.emit("todoEdited");
    }
    upadateToDo(newInput){
        //console.log(index);
        let indexOfNewInput = this.todoList.indexOf(this.userinput);
         console.log(indexOfNewInput);
        this.todoList.splice(indexOfNewInput,1,newInput);
        this.emit("todoUpdated");

    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TODO": {
                this.createTodo(action.userinput);
                break
            }
            case "DELETE_TODO": {
                this.deleteToDo(action.index);
                break
            }
            case "EDIT_TODO": {
               
                this.editToDo(action.index);
                break
            }
            case "UPDATE_TODO":{
                this.upadateToDo(action.newInput);
                break
            }
            case "CHECKDUPLICATE_TODO":{
                this.checkDuplicates(action.userinput);
                break
            }
        }
    }


}
const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
window.dispatcher = dispatcher;
export default appStore;