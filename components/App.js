import React, { component } from 'react';
import appStore from '../Stores/AppStore'
import * as appActions from '../Actions/AppActions';

export class App extends React.Component {

    constructor() {
        super();
        this.state = {
            userinput: appStore.getInput(),
            todoList: appStore.getAll(),
            editBtn: appStore.getEditBtn(),
            allertMsg:appStore.getAllertMsg(),
            errMsg:appStore.getErrMsg(),
            //indexOfuserInput:appStore.getIndex(),


        }
        this.getTodos = this.getTodos.bind(this);
        this.getUserInput = this.getUserInput.bind(this);
        this.getEditUserInput = this.getEditUserInput.bind(this);
        this.geteditBtn = this.geteditBtn.bind(this);
        this.getUpdatedTodos = this.getUpdatedTodos.bind(this);
        this.todoList = appStore.getAll();

        //this.userinput = appStore.getInput();
    }

    componentDidMount() {
        appStore.on("userInputChanged", this.getTodos);
        appStore.on("todoAdded", this.getTodos);
        appStore.on("todoDeleted", this.getTodos);
        appStore.on("todoEdited", this.getEditUserInput);
        appStore.on("todoUpdated",this.getUpdatedTodos)
    }
    componentWillUnmount() {
        appStore.removeListener("userInputChanged", this.getTodos);
        appStore.removeListener("todoAdded", this.getTodos);
        appStore.removeListener("todoDeleted", this.getTodos);
        appStore.removeListener("todoEdited", this.getEditUserInput);
        appStore.removeListener("todoUpdated",this.getUpdatedTodos)
    }
    getTodos() {
        // console.log('xxxxx')
        this.setState({
            todoList: appStore.getAll(),
            userinput:"",
            editBtn:false,
            allertMsg:appStore.getAllertMsg(),
            errMsg:appStore.getErrMsg(),

        });
    }
    getUpdatedTodos(){
        this.setState({
            todoList: appStore.getAll(),
            userinput:"",
            editBtn:false,
            allertMsg:"ToDo is Updated"

        });
    }


    getUserInput() {
        this.setState({
            userinput: appStore.getInput(),

        })

    }
    getEditUserInput() {
     
        this.setState({
            userinput: appStore.getInput(),
            editBtn:appStore.getEditBtn()
           
            
        })
    }

    geteditBtn() {
        this.setState({
            editBtn: appStore.getEditBtn(),
        })
    }
    createTodo() {
        let userinput = this.state.userinput;
        appActions.createTodo(userinput);

    }
    checkDuplicates(){
        let userinput = this.state.userinput;
        appActions.checkDuplicates(userinput);
    }
    

    changeUserInput(e) {
        this.setState({
            userinput: e.target.value,
            allertMsg:"",
            errMsg:''
            

        });
        // console.log(this.state.userinput)
    }
    deleteToDo(index) {
        //console.log(index);
        appActions.deleteToDo(index)
    }
    editToDo(index, val) {
       appActions.editToDo(index, val)
    }
    updateTask(){
        // console.log(this.state.userinput)
        let newInput = this.state.userinput;
        //let indexOfNewInput = this.todoList[this.state.todoList.indexOf(newInput)];
     
       // console.log(indexOfNewInput);
       //let newIndex = this.state.indexOfuserInput;
       console.log(newInput);
        appActions.updateToDo(newInput);
    }

    render() {
        let msg ;
        let errmsg;
        const CSSsuccess = {
            color: 'green'
        }
        const CSSerr={
            color:'red'
        }
        if(this.errMsg !== ''){
            errmsg = this.state.errMsg;
        }

        if(this.state.allertMsg  !== ''){
            msg = this.state.allertMsg;
        }
        let btn;
        

        if (this.state.editBtn == true) {
            btn = <button onClick={this.updateTask.bind(this)}>Update</button>
        }
      else {
            btn = <button onClick={this.checkDuplicates.bind(this)}>Add</button>
        }

        let todolist = this.todoList.map((val, index) =>
            <li key={index}>{val}&nbsp;
                        <button onClick={this.deleteToDo.bind(this, index)}>Remove</button>&nbsp;
                <button onClick={this.editToDo.bind(this, index)} >Edit</button>
            </li>

        )

        console.log("this.state.userinput ", this.state.userinput)

        return (
            <div><h4 style={ CSSsuccess}>{msg}</h4>
            <h4 style={CSSerr}>{errmsg}</h4>
                <div>{todolist}</div>
                <div><input type="text" onChange={this.changeUserInput.bind(this)} value={this.state.userinput} />
                    {btn}</div>
            </div>

        )
    }

}
export default App;