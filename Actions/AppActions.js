import dispatcher from '../dispatcher';


export function createTodo(userinput){
    dispatcher.dispatch({
        type:"CREATE_TODO",
        userinput,
    })
 
}

export function deleteToDo(index){
    dispatcher.dispatch({
        type:"DELETE_TODO",
        index,
    })
//console.log(index);
}
export function editToDo(index){
    console.log("Calling Edit")
    dispatcher.dispatch({
        type:"EDIT_TODO",
        index,
     
    })
//console.log(index);
}
export function updateToDo(newInput){
    dispatcher.dispatch({
        type:"UPDATE_TODO",
        newInput,
        
    })
    //console.log(index);
}
export function checkDuplicates(userinput){
    dispatcher.dispatch({
        type:"CHECKDUPLICATE_TODO",
        userinput,
        
    })
    //console.log(index);
}
