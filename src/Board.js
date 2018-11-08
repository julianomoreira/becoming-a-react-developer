import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
    constructor(){
        super()
        this.state = {
            notes: []            
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
    }
    componentWillMount(){
        var self = this;
        if (this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
            .then(response => response.json())
            .then(json => json[0]
                .split('. ')
                    .forEach(sentence => self.add(sentence.substring(0, 25))))
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }
    add(text){
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        }))
    }
    nextId(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    eachNote(note, i){
        return (
            <Note key={note.id} 
                index={note.id}
                onChange={this.update}
                onRemove={this.remove}>
                {note.note}
            </Note>    
        )        
    }
    update(newText, i){
        console.log('updating at ',i, newText)
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }))
    }
    remove(id){
        console.log('removing...', id);
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    render(){
        return (
            <div>
                {this.state.notes.map(this.eachNote)}
                <button id="add" onClick={this.add.bind(null, "new note")}>Add</button>
            </div>
        )
    }
}

export default Board