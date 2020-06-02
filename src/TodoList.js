import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const APIURL = 'http://localhost:8081/api/todos/';


class TodoList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentWillMount()
    {
        this.loadTodos();
    }

    loadTodos()
    {
        fetch(APIURL)
        .then(data => data.json())
        .then(todos => this.setState({todos}));
    }

    addTodo(val)
    {
        fetch(APIURL,{
            method:'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name: val})
        })
        .then(data => data.json())
        .then(newTodo => {this.setState({todos:[...this.state.todos,newTodo]})});
    }

    deleteTodo(id){
        const deleteURL = APIURL + id;
        fetch(deleteURL,{
            method:'delete'
        })
        .then(data => data.json())
        .then(() => {
            const todos = this.state.todos.filter(todo => todo._id !== id);
            this.setState({todos: todos});
        });
    }

    toggleTodo(todo){
        const updateURL = APIURL + todo._id;
        fetch(updateURL,{
            method:'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(data => data.json())
        .then((updatedTodo) => {
            const todos = this.state.todos.map(t =>
                (t._id === updatedTodo._id) ? {...t, completed: !t.completed} : t
                )
            this.setState({todos: todos});
        });
    }

    render()
    {
        const todos = this.state.todos.map((t) => (
            <TodoItem key={t._id} {...t} 
                onDelete={this.deleteTodo.bind(this,t._id)}
                onToggle={this.toggleTodo.bind(this,t)}>
            </TodoItem>
        ))
        return(
            <div>
                <h1>
                    To-Do List
                </h1>
                <TodoForm addTodo={this.addTodo}></TodoForm>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList;