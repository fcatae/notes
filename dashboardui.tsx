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

interface IDeleteTaskProps {
    id: string;
}

class App extends React.Component<AppProps,{}> {
   render() {
       var taskCollection = this.props.tasks;
       
       let domTasks = [];

       for(let id in taskCollection) {
           let task = taskCollection[id];
           domTasks.push( <p key={id}>
               <TaskItem id={id} title={task.title} />
               <DeleteButton id={id} />
               </p>);
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
              
       return <button onClick={this.click.bind(this)}>{title}</button>;
   }
}

class DeleteButton extends React.Component<IDeleteTaskProps,{}> {
    click() {
        let id = this.props.id;
        removeTask(id);
    }

   render() {
       let id = this.props.id;
              
       return <span onClick={this.click.bind(this)}>&#x2713;</span>;
   }
}


function render() {
    ReactDOM.render(<App tasks={openTasks} />, document.getElementById('app'));
}
