import React,{Component} from 'react';
import InputBox from './component/InputBox';
import TaskList from './component/TaskList';
class App extends Component {
    state = { 
        tasks:[{id:1,name:"Make Tea"},{id:2,name:"Learn ES6"},{id:3,name:"Learn JSX"}]
    }
    removeTask = (id)=>{
        let {tasks} = this.state;
        let remaingTasks = tasks.filter((task => task.id !== id))
        this.setState({tasks:remaingTasks});
    }
    getDataFromInput = (newTask)=>{
        console.log(newTask);
        this.setState({tasks:[{id:this.state.tasks.length+1,name:newTask},...this.state.tasks]})
    }
    render() { 
        let {tasks} = this.state;
        return (
            <React.Fragment>
                <InputBox getDataFromInput = {this.getDataFromInput}/>
                <TaskList removeTask = {this.removeTask} tasks = {tasks}/>
            </React.Fragment>

        );
    }
}
 
export default App;