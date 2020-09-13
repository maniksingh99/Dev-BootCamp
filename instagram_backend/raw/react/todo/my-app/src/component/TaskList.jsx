import React from 'react';
const TaskList =(props)=>{
    let {tasks,removeTask} = props;
    return(
        <React.Fragment>
            <div className = "container">
                {
                    tasks.map((task)=>{
                        return(<div key = {task.id}>
                            <p className = "d-inline mr-4">{task.name}</p>
                            <button className = "btn btn-danger" onClick ={()=>{removeTask(task.id)}}>X</button>
                        </div>)
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default TaskList;