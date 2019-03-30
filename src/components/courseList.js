import React, {Component}  from 'react';
import Course from './Course';

class CourseList extends Component{
    constructor(props){
        super(props);
        this.checkProvider = this.checkProvider.bind(this);
        this.checkRecentListing = this.checkRecentListing.bind(this);
        this.checkParent = this.checkParent.bind(this);
        this.checkUniversity = this.checkUniversity.bind(this);
        this.itemCount = this.props.total;
        this.set = false;
    }
    checkRecentListing(item){
        const { provider } = this.props;
        return  item['Next Session Date'];
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

        
        let callbackFunction = this.checkRecentListing;

        if (selection && !this.set) {
            switch(selection) {
                case 'provider': 
                    this.set = true
                    callbackFunction = this.checkProvider
                    this.itemCount = data.filter(this.checkProvider).length;
                    break;
                case 'parent': 
                    this.set = true;
                    callbackFunction = this.checkParent
                    this.itemCount = data.filter(this.checkParent).length;
                    break;
                case 'university': 
                    this.set = true
                    callbackFunction = this.checkUniversity
                    this.itemCount = data.filter(this.checkUniversity).length;
                    break;
                default: 
                    return null;        
            }
        }

        return (
            <div className="courseList">
                <div className="totalCount">Courses listed : {this.itemCount}</div>
                { 
                    data.filter(callbackFunction).map(item =><Course data={item} />)                    
                }  
            </div>
        )
    }
}
export default CourseList;