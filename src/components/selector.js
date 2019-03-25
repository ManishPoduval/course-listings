import React from 'react';

class Selector extends React.Component{
    render(){
        return (
            <div className="selector row my-4">
                <div class="col-md-4">
                <form onSubmit={this.props.updateParent}>
                <select name="parent" class="form-control">
                    <option value=" " selected>Category</option>
                    {this.props.parent.map(item => 
                        <option value={item}>
                            {item}
                        </option>
                    )}
                </select>
                <div class="text-center"><input type="submit" value="search" class="btn btn-primary mx-1 my-1"/></div>
                </form>
                </div>

                <div class="col-md-4">
                <form onSubmit={this.props.updateProvider}>
                <select name="provider" class="form-control">
                    <option value=" " selected>Provider</option>
                    {this.props.provider.map(item => 
                        <option value={item}>
                            {item}
                        </option>
                    )}
                </select>
                <div class="text-center"><input type="submit" value="search"  class="btn btn-primary mx-1 my-1"/></div>
                </form>
                </div>


                <div class="col-md-4">
                <form onSubmit={this.props.updateUniversity}>
                <select name="university" class="form-control">
                    <option value=" " selected>University</option>
                    {this.props.university.map(item => 
                        <option value={item}>
                            {item}
                        </option>
                    )}
                </select>
                <div class="text-center"><input type="submit" value="search" class="btn btn-primary mx-1 my-1" /></div>
                </form>
                </div>
                Total courses: {this.props.total}
            </div>
        )
    }
}
export default Selector;