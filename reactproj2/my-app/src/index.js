//import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import './App.js';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';

// The default locale is en-US, but we can change it to other language
import frFR from 'antd/lib/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/fr';
import 'antd/dist/antd.css';
import './index.css';

import { Card , Input, List, Tag, Switch , Checkbox} from 'antd';

moment.locale('fr');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [],
      inputValue: ''
    }
    this.addContent = this.addContent.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  addContent() {
    let tmpValue =  this.state.inputValue
    if (tmpValue === "") {
      return
    }
    let tmpDate = this.getCurrentDate()
    let tmpList = JSON.parse(JSON.stringify(this.state.list));
    tmpList.unshift([tmpValue, 0, tmpDate])
    this.setState({inputValue: ''});
    this.setState({list: tmpList})
    this.nameInput.focus();
  }

  handleInputValue(event) {
    let tmpInputValue = event.target.value;
    this.setState({inputValue: tmpInputValue});
  }
  getCurrentDate(){
    let dt = new Date()
    let year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDate();
    month = month + 1;
    if (month <= 9){month = "0" + month;}
    if (day <= 9){day = "0" + day;}
    let creteData = year+ "年" + month+ "月" + day+ "日"
    return creteData

  }

    removeItem(index){
    let tmpListdata = JSON.parse(JSON.stringify(this.state.list))
    let tmpItem = tmpListdata.splice(index, 1);
    tmpItem[0][1] += 1;
    if (tmpItem[0][1] === 1){
      tmpListdata.splice(index, 0, ...tmpItem);
    }
    this.setState({list: tmpListdata});
  }

  handleNewTodoKeyDown(event) {
    let ENTER_KEY = 13;
    if (event.keyCode === ENTER_KEY) {
      this.addContent();
    }
  }
  
  handleSwitch(index){
    let tmpList = JSON.parse(JSON.stringify(this.state.list));
    tmpList[index][1] = tmpList[index][1] ? 0 : 1;
    this.setState({list: tmpList});
  } 

  render() {
  return (
    <div className="App">
      <Card style={{width:'500px',background: '#f0f0f0'}} title={<span style={{fontSize:28}}>React ToDoList</span>} headStyle={{borderBottom:0}} bodyStyle={{paddingTop:0,paddingBottom:0}}>
        <List
        size="large"
        bordered
        dataSource={this.state.list}
        style={{color: "#000000", fontWeight: "bold",background: '#ffffff'}}
        renderItem={
          (item, index) => (
            <List.Item>
            <Checkbox style={{marginRight: 20}} onChange={this.handleSwitch.bind(this, index)} checked = {item[1] ? true : false} />
            <div onClick={this.removeItem.bind(this, index)} style={{cursor:"pointer"}}>
            {item[1] ? <div style={{textDecoration:"line-through"}}>{item[0]}</div> : <div>{item[0]}</div>}
            </div>
            </List.Item>)
        }
        />
      <Input 
      style = {{marginTop: 20, marginBottom: 20}}
      className="app-input" size="large" placeholder="請輸入待辦事項(Enter加入)" 
      onChange={this.handleInputValue.bind(this)} 
      value={this.state.inputValue}
      onKeyDown={this.handleNewTodoKeyDown}
      ref={(input) => { this.nameInput = input; }} />
      </Card>

    </div>
  );
  }
}

//export default App;

ReactDOM.render(<App />, document.getElementById('content1'));

//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
