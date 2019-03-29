import React, {Component}  from 'react';

class Selector extends Component{
    render(){

        const {
            updateParent,
            parent,
            updateProvider,
            provider,
            updateUniversity,
            university,
            total,
        } = this.props;

        return (
            <div className="selector row my-4">
                <div class="col-md-4">
                    <select name="parent" class="form-control" onChange={updateParent}>
                        <option value=" " selected>Category</option>
                            {parent.map(item => 
                                <option value={item}>
                                    {item}
                                </option>
                            )}
                    </select>   
                </div>
                <div class="col-md-4">
                    <select name="provider" class="form-control"  onChange={updateProvider}>
                        <option value=" " selected>Provider</option>
                            {provider.map(item => 
                                <option value={item}>
                                    {item}
                                </option>
                            )}
                    </select>
                </div>
                <div class="col-md-4">
                    <select name="university" class="form-control"  onChange={updateUniversity}>
                        <option value=" " selected>University</option>
                            {university.map(item => 
                                <option value={item}>
                                    {item}
                                </option>
                        )}
                    </select>
                </div>
                Total courses: {total}
            </div>
        )
    }
}
export default Selector;