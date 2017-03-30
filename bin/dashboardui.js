var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var taskCollection = this.props.tasks;
        var domTasks = [];
        for (var id in taskCollection) {
            var task = taskCollection[id];
            domTasks.push(React.createElement("p", { key: id },
                React.createElement(TaskItem, { id: id, title: task.title }),
                React.createElement(DeleteButton, { id: id })));
        }
        return React.createElement("div", null, domTasks);
    };
    return App;
}(React.Component));
var TaskItem = (function (_super) {
    __extends(TaskItem, _super);
    function TaskItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskItem.prototype.click = function () {
        var id = this.props.id;
        openTask(id);
    };
    TaskItem.prototype.render = function () {
        var id = this.props.id;
        var title = this.props.title;
        return React.createElement("button", { onClick: this.click.bind(this) }, title);
    };
    return TaskItem;
}(React.Component));
var DeleteButton = (function (_super) {
    __extends(DeleteButton, _super);
    function DeleteButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteButton.prototype.click = function () {
        var id = this.props.id;
        removeTask(id);
    };
    DeleteButton.prototype.render = function () {
        var id = this.props.id;
        return React.createElement("span", { onClick: this.click.bind(this) }, "\u2713");
    };
    return DeleteButton;
}(React.Component));
function render() {
    ReactDOM.render(React.createElement(App, { tasks: openTasks }), document.getElementById('app'));
}
