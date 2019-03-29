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

        if(selection==='provider' && !this.set ){
            this.set = true
            this.setState({
                item: data.filter(this.checkProvider).length,
            })
        }
        if(selection==='parent' && !this.set ){
            this.set = true
            this.setState({
                item: data.filter(this.checkParent).length,
            })
        }
        if(selection==='university' && !this.set ){
            this.set = true
            this.setState({
                item: data.filter(this.checkUniversity).length,
            })
        }
        return (
            <div className="courseList">
                <p>Courses found: {this.state.item}</p>
                { 
                    selection === 'provider' &&
                    <ul>{
                        data.filter(this.checkProvider).map(item =><Course data={item} />)
                        }
                    </ul>
                }  
                { 
                    selection ==='parent' &&
                    <ul>{
                        data.filter(this.checkParent).map(item =><Course data={item} />)
                        }
                    </ul>
                }
                
                { selection === 'university' &&
                    <ul>
                    {
                        data.filter(this.checkUniversity).map(item =><Course data={item} />)
                    }
                    </ul>
                }
            </div>
        )
    }
}
export default CourseList;