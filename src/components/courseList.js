import React, {Component}  from 'react';
import Course from './Course';

class CourseList extends Component{
    constructor(){
        super();
        this.checkProvider = this.checkProvider.bind(this);
        this.checkParent = this.checkParent.bind(this);
        this.checkUniversity = this.checkUniversity.bind(this);
        this.state = {
            item: 0,
        }
        this.set = false;
    }
    checkProvider(item){
        const { provider } = this.props;
        return item['Provider'] === provider;
    }
    checkParent(item){
        const { parent } = this.props;
        return item['Parent Subject'] === parent;
    }
    checkUniversity(item){
        const { university } = this.props;
        return item['Universities']['Institutions'] === university;
    }
    componentWillReceiveProps(){
        this.set =false
    }
    render(){

        const { 
            selection,
            data,
        } = this.props;

        
        let callbackFunction = this.checkProvider;

        if (selection && !this.set) {
            switch(selection) {
                case 'provider': 
                    this.set = true
                    callbackFunction = this.checkProvider
                    this.setState({
                        item: data.filter(this.checkProvider).length,
                    })
                    break;
                case 'parent': 
                    this.set = true;
                    callbackFunction = this.checkParent
                    this.setState({
                        item: data.filter(this.checkParent).length,
                    })
                    break;
                case 'university': 
                    this.set = true
                    callbackFunction = this.checkUniversity
                    this.setState({
                        item: data.filter(this.checkUniversity).length,
                    })
                    break;
                default: 
                    return null;        
            }
        }

        return (
            <div className="courseList">
                <p >Courses found : {this.state.item}</p>
                { 
                    data.filter(callbackFunction).map(item =><Course data={item} />)                    
                }  
            </div>
        )
    }
}
export default CourseList;