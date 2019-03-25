import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Selector from './components/selector';
import CourseList from './components/courseList';

class App extends Component {

  constructor(){
    super();
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

        // { this.state.data != undefined &&
        //   <ul>{this.state.data.map(item => <Course data={item} />)}</ul>
        // }
  }

  updateParent(e){
    e.preventDefault();
    const parentSelected = e.target.elements.parent.value;
    this.setState({
      currentParent : parentSelected,
      selection: 'parent',
    })
  }  

  updateUniversity(e){
    e.preventDefault();
    const universitySelected = e.target.elements.university.value;
    this.setState({
      currentUniversity : universitySelected,
      selection: 'university',
    })
  } 
  
  updateProvider(e){
    e.preventDefault();
    const providerSelected = e.target.elements.provider.value;
    this.setState({
      currentProvider : providerSelected,
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

    console.log(this.state.university)
  }

  
  render() {
    return (
      <div className="first">
        <Header />
        { this.state.data != undefined &&
          <Selector parent={this.state.parent} 
              provider={this.state.provider} 
              university={this.state.university}
              updateParent={this.updateParent}
              updateProvider={this.updateProvider}   
              updateUniversity={this.updateUniversity}  
              total={this.state.total}
          />
        }
        { this.state.data != undefined &&
          <CourseList data={this.state.data} 
              provider={this.state.currentProvider} 
              parent={this.state.currentParent}
              university={this.state.currentUniversity}
              selection={this.state.selection}
          />
        }
      </div>
    );
  }
}

export default App;
