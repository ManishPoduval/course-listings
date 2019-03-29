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
      currentParent: undefined,
      currentChild: undefined,
      currentProvider: undefined,
      currentUniversity: undefined,
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
    this.setState({
      currentParent : parentSelected,
      currentProvider: '',
      currentUniversity: '',
      selection: 'parent',
    })
  }  

  updateUniversity(e){
    e.preventDefault();
    const universitySelected = e.target.value;
    this.setState({
      currentUniversity : universitySelected,
      currentParent: '',
      currentProvider: '',
      selection: 'university',
    })
  } 
  
  updateProvider(e){
    e.preventDefault();
    const providerSelected = e.target.value;
    this.setState({
      currentProvider : providerSelected,
      currentParent: undefined,
      currentUniversity: undefined,
      selection: 'provider',
    })
  }


  componentDidMount = async() => {
    const data_call = await fetch("https://api.myjson.com/bins/1fq8pm");
    const json_data = await data_call.json();
    var items = json_data;

    var parent_lookup = {};
    var parent_result = [];
    
    for (let item, i = 0; item = items[i++];) {
      let name = item['Parent Subject'];

      if (!(name in parent_lookup)) {
        parent_lookup[name] = 1;
        parent_result.push(name);
      }
    }
    this.setState({
      total: Object.keys(items).length
    })

    var university_lookup = {};
    var university_result = [];

    for (let item, i = 0; item = items[i++];) {
      let name = item['Universities']['Institutions'];

      if (!(name in university_lookup)) {
        university_lookup[name] = 1;
        university_result.push(name);
      }
    }

    var provider_lookup = {};
    var provider_result = [];

    for (let item, i = 0; item = items[i++];) {
      let name = item['Provider'];

      if (!(name in provider_lookup)) {
        provider_lookup[name] = 1;
        provider_result.push(name);
      }
    }

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
          />
        }
      </div>
    );
  }
}

export default App;
