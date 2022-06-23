import './App.css';
import axios from 'axios'
import { Component } from 'react';


const api =  axios.create({
  baseURL: 'http://localhost:3001/api/notes'
})

class App extends Component {

  state = {
    notes: []
  }

  constructor(){
    super()
   this.getNotes()
  }

  
  getNotes = async() => {
    let data = await api.get('/').then(({data})=>data)
    this.setState({notes: data})
  }
  
  createNote = async()=>{
    const nTitle = document.querySelector(".nTitle")
    const nBody = document.querySelector(".nBody")
    let content = {title: nTitle.value, body:nBody.value}
    await api.post('/',content)
    this.getNotes()
  }

  deleteNote = async(id)=>{
    await api.delete(`/${id}`)
    this.getNotes()
  }
/*
  modifyNote = async(id)=>{
    await api.patch(`/${id}`,)
    this.getNotes()
  }
*/
  render(){
  return (
    <div class="App">
        <div className='div_form'>
        
        <form onSubmit={this.createNote}>
              <fieldset>
                <legend>CREATE NOTE</legend>
              <h1>New Note</h1>
              <p>Title <input type="text" class="nTitle"/></p>
              <p>Body <input type="text" class="nBody"/></p>
          <button type='submit' class='btn_new_note'>Submit</button>
          </fieldset> 
      </form>
      <br></br>
       </div>
        <fieldset className='f_table'>
        <h1>Notes</h1>
        <table align='center'>
        <thead>
        <tr>  
          <th >ID</th>
          <th >TITLE</th>
          <th >BODY</th>
          <th >MOD</th>
          <th >DEL</th>
        </tr>
        </thead>
        <tbody align="center">
        {this.state.notes.map(note => {
          return(

          <tr>
            <td>{note.id}</td>
            <td>{note.title}</td>
            <td>{note.body}</td>
          
            <td><button className='btn_mod' disabled>M</button></td>

            <td><button className='btn_del' onClick={()=>this.deleteNote(note.id)}>D</button></td>
          </tr>)}
          )} 
          </tbody>
        </table>
        </fieldset>
        <br></br>
        

      
    </div>
  );
}
}
export default App;
