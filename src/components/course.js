import React from 'react';


class Course extends React.Component{
    render(){
        return (
            <div className="course">
                <div class="card point mt-2">
                    <div class="card-header">
                        {this.props.data['Course Id']} : {this.props.data['Course Name']}
                    </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">Category: {this.props.data['Parent Subject']}</div>
                        <div class="col-md-6">Sub Category: {this.props.data['Child Subject']}</div>
                    </div>
                    Taught in : {this.props.data['Universities']['Institutions']}<br />
                    <div class="row">
                        <div class="col-md-4"><a href={this.props.data['Course Name']}>Course Link</a></div>
                        <div class="col-md-4"><a href={this.props.data['Video(Url)']}>Video Link</a></div>
                        <div class="col-md-4">{this.props.data['Next Session Date']}</div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Course;