declare var openTasks : ITaskCollection;

interface ITaskCollection {
    [taskId: string]: ITask;
}

interface ITask {
    id: string;
    title: string;
}

interface AppProps {
    tasks: ITaskCollection;
}

class App extends React.Component<AppProps,{}> {
   render() {
       var taskCollection = this.props.tasks;
       
       let domTasks = [];

       for(let id in taskCollection) {
           let task = taskCollection[id];
           domTasks.push( <TaskItem key={id} id={id} title={task.title} /> );
       }
       
       return <div>{domTasks}</div>;
   }
}

class TaskItem extends React.Component<ITask,{}> {
    click() {
        let id = this.props.id;
        openTask(id);
    }

   render() {
       let id = this.props.id;
       let title = this.props.title;
              
       return <p><button onClick={this.click.bind(this)}>{title}</button></p>;
   }
}

function render() {
    ReactDOM.render(<App tasks={openTasks} />, document.getElementById('app'));
}
