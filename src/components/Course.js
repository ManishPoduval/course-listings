import React, {Component}  from 'react';

class Course extends Component{
    render(){
        const {
            data,
        } = this.props;

        return (
            <div className="course">
                <div class="card point mt-2">
                    <div class="card-header">
                        {data['Course Id']} : {data['Course Name']}
                    </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">Category: {data['Parent Subject']}</div>
                        <div class="col-md-6">Sub Category: {data['Child Subject']}</div>
                    </div>
                    Taught in : {data['Universities']['Institutions']}<br />
                    <div class="row">
                        <div class="col-md-4"><a href={data['Url']} target='_blank'>Course Link</a></div>
                        <div class="col-md-4"><a href={data['Video(Url)']} target='_blank'>Video Link</a></div>
                        <div class="col-md-4">{data['Next Session Date']}</div>
                        {
                            data['Length'] ? (<div class="col-md-4">Length: {data['Length']}</div>) : null
                        }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Course;
