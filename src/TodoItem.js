import React, {Component} from 'react';

class TodoItem extends Component{
    render()
    {
        return(
            <li>
                <span style = {{textDecoration : this.props.completed?'line-through':'none'}}
                onClick={this.props.onToggle}>
                {this.props.name}
                </span>
                <span onClick={this.props.onDelete}> X </span>
            </li>
        )
    }
}

export default TodoItem;