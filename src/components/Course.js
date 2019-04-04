import React, {Component}  from 'react';

class Course extends Component{
    render(){
        const {
            data,
        } = this.props;

        return (
            <div className="course">
                <div className="card point mt-2">
                    <div className="card-header">
                     {data['Course Name']}
                    </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">Category: {data['Parent Subject']}</div>
                        <div className="col-md-6">Sub Category: {data['Child Subject']}</div>
                    </div>
                    Taught in : {data['Universities']['Institutions']}<br />
                    <div className="row">
                        <div className="col-md-4"><a href={data['Url']} target='_blank'>Course Link</a></div>
                        <div className="col-md-4"><a href={data['Video(Url)']} target='_blank'>Video Link</a></div>
                        <div className="col-md-4">{data['Next Session Date']}</div>
                        {
                            data['Length'] ? (<div className="col-md-4">Length: {data['Length']}</div>) : null
                        }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Course;
