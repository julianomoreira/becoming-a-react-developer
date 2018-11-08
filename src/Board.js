import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
    constructor(){
        super()
        this.state = {
            notes: [
                {
                    id: 0,
                    note: "Call John"
                },
                {
                    id: 1, 
                    note: "Email Juju"
                },
                {
                    id: 2, 
                    note: "Text Laise"
                }
            ]            
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
    }
    eachNote(note, i){
        return (
            <Note key={i} 
                index={i}
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
            </div>
        )
    }
}

export default Board