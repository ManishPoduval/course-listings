import React from 'react';
import Course from './course';

var set = false
class CourseList extends React.Component{
    constructor(){
        super();
        this.checkProvider = this.checkProvider.bind(this);
        this.checkParent = this.checkParent.bind(this);
        this.checkUniversity = this.checkUniversity.bind(this);
        this.state = {
            item: 0,
        }
    }
    checkProvider(item){
        return item['Provider']===this.props.provider;
    }
    checkParent(item){
        return item['Parent Subject']===this.props.parent;
    }
    checkUniversity(item){
        return item['Universities']['Institutions']===this.props.university;
    }
    componentWillReceiveProps(){
        set=false
    }
    render(){
        if(this.props.selection==='provider' && !set){
            set=true
            this.setState({
                item: this.props.data.filter(this.checkProvider).length,
            })
        }
        if(this.props.selection==='parent' && !set){
            set=true
            this.setState({
                item: this.props.data.filter(this.checkParent).length,
            })
        }
        if(this.props.selection==='university' && !set){
            set=true
            this.setState({
                item: this.props.data.filter(this.checkUniversity).length,
            })
        }
        return (
            <div className="courseList">
                <p>Courses found: {this.state.item}</p>
                { this.props.selection==='provider' &&
                    <ul>{
                        this.props.data.filter(this.checkProvider).map(item =><Course data={item} />)
                        }
                    </ul>
                }

                
                { this.props.selection==='parent' &&
                    <ul>{
                        this.props.data.filter(this.checkParent).map(item =><Course data={item} />)
                        }
                    </ul>
                }
                
                { this.props.selection==='university' &&
                    <ul>
                    {
                        this.props.data.filter(this.checkUniversity).map(item =><Course data={item} />)
                        }
                    </ul>
                }


            </div>
        )
    }
}
export default CourseList;