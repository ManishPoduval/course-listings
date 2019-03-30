import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Selector from './components/Selector';
import CourseList from './components/CourseList';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: undefined,
      parent: [],
      child: [],
      provider: [],
      university: [],
      currentParent: null,
      currentChild: undefined,
      currentProvider: null,
      currentUniversity: null,
      selection : undefined,
      total: undefined,
    }
    this.updateParent = this.updateParent.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.updateUniversity = this.updateUniversity.bind(this);
  }

  updateParent(e){
    e.preventDefault();
    const parentSelected = e.target.value;
    var universityDropdown = document.getElementById("university");
    universityDropdown.selectedIndex = 0;
    let providertDropdown = document.getElementById("provider");
    providertDropdown.selectedIndex = 0;
    this.setState({
      currentParent : parentSelected,
      currentProvider: null,
      currentUniversity: null,
      selection: 'parent',
    })
  }  

  updateUniversity(e){
    e.preventDefault();
    const universitySelected = e.target.value;
    let parentDropdown = document.getElementById("parent");
    parentDropdown.selectedIndex = 0;
    let providertDropdown = document.getElementById("provider");
    providertDropdown.selectedIndex = 0;
    this.setState({
      currentUniversity : universitySelected,
      currentParent: null,
      currentProvider: null,
      selection: 'university',
    })
  } 
  
  updateProvider(e){
    e.preventDefault();
    const providerSelected = e.target.value;
    let parentDropdown = document.getElementById("parent");
    parentDropdown.selectedIndex = 0;
    var universityDropdown = document.getElementById("university");
    universityDropdown.selectedIndex = 0;
    this.setState({
      currentProvider : providerSelected,
      currentParent: null,
      currentUniversity: null,
      selection: 'provider',
    })
  }


  componentDidMount = async() => {
    const data_call = await fetch("https://api.myjson.com/bins/1fq8pm");
    const json_data = await data_call.json();
    var items = json_data;

    var parent_lookup = {};
    var parent_result = [];
    var university_lookup = {};
    var university_result = [];
    var provider_lookup = {};
    var provider_result = [];
    
    for (let item, i = 0; item = items[i++];) {
      let subjectName = item['Parent Subject'];

      if (!(subjectName in parent_lookup)) {
        parent_lookup[subjectName] = 1;
        parent_result.push(subjectName);
      }

      let institutionName = item['Universities']['Institutions'];

      if (!(institutionName in university_lookup)) {
        university_lookup[institutionName] = 1;
        university_result.push(institutionName);
      }

      let providerName = item['Provider'];

      if (!(providerName in provider_lookup)) {
        provider_lookup[providerName] = 1;
        provider_result.push(providerName);
      }
    }
    this.setState({
      total: Object.keys(items).length
    })
    this.setState({
      data: json_data,
      parent: parent_result,
      university: university_result,
      provider: provider_result,
    })
  }

  render() {

    const {
      data,
      parent,
      provider,
      university,
      total,
      currentProvider,
      currentParent,
      currentUniversity,
      selection,
    } = this.state

    return (
      <div className="first">
        <Header />
        { 
          data != undefined &&
          <Selector parent={parent} 
              provider={provider} 
              university={university}
              updateParent={this.updateParent}
              updateProvider={this.updateProvider}   
              updateUniversity={this.updateUniversity}
              total={total}
          />
        }
        { 
          data != undefined &&
          <CourseList data={data} 
              provider={currentProvider} 
              parent={currentParent}
              university={currentUniversity}
              selection={selection}
              total={total}
          />
        }
      </div>
    );
  }
}

export default App;
