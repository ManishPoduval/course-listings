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
                <div className="col-md-4">
                    <label>Category</label>
                    <select id="parent" className="form-control" onChange={updateParent}>
                        <option selected>None</option>
                            {parent.map((item, index) => 
                                item && 
                                <option  key={index} value={item}>
                                    {item}
                                </option>
                            )}
                    </select>   
                </div>
                <div className="col-md-4">
                    <label>Provider</label>
                    <select id="provider" className="form-control"  onChange={updateProvider}>
                        <option selected>None</option>
                            {provider.map((item, index) => 
                                item && 
                                <option  key={index} value={item}>
                                    {item}
                                </option>
                            )}
                    </select>
                </div>
                <div className="col-md-4">
                    <label>University</label>
                    <select id="university" className="form-control"  onChange={updateUniversity}>
                        <option selected>None</option>
                            {university.map((item, index) => 
                                item && 
                                <option  key={index} value={item}>
                                    {item}
                                </option>
                        )}
                    </select>
                </div>
                <div className="col-md-4">
                    <div className="totalCount">Total courses: {total}</div>
                </div>
            </div>
        )
    }
}
export default Selector;