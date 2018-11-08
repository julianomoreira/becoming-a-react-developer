import React, { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

class Note extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.save = this.save.bind(this);
    }
    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }
    componentDidUpdate(){
        var textArea
        if (this.state.editing){
            textArea = this._nextText
            textArea.focus()
            textArea.select()
        }
    }
    randomBetween(x, y, s){
        return x + Math.ceil(Math.random() * (y-x)) + s
    }
    edit(){        
        this.setState({
            editing: true
        })
    }
    remove(){
        this.props.onRemove(this.props.index)
    }
    save(e){
        e.preventDefault()      
        console.log(this.props);  
        this.props.onChange(this._nextText.value, this.props.index)
        this.setState({
            editing: false
        })
    }
    renderForm(){
        return (
            <div className="note" style={this.style}>
            <form onSubmit={this.save}>
                <textarea ref={input => this._nextText = input} defaultValue={this.props.children} />
                <button id="save"><FaSave /></button>
            </form>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button id="edit" onClick={this.edit}><FaPencilAlt /></button>
                    <button id="remove" onClick={this.remove}><FaTrash /></button>
                </span>
            </div>
        )
    }
    render(){
        return this.state.editing ? this.renderForm() : this.renderDisplay()        
    }
}

export default Note;