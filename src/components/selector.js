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
                    <select name="parent" className="form-control" onChange={updateParent}>
                        <option value=" " selected>Category</option>
                            {parent.map((item, index) => 
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            )}
                    </select>   
                </div>
                <div className="col-md-4">
                    <select name="provider" className="form-control"  onChange={updateProvider}>
                        <option value=" " selected>Provider</option>
                            {provider.map((item, index) => 
                                <option  key={index} value={item}>
                                    {item}
                                </option>
                            )}
                    </select>
                </div>
                <div className="col-md-4">
                    <select name="university" className="form-control"  onChange={updateUniversity}>
                        <option value=" " selected>University</option>
                            {university.map((item, index) => 
                                <option  key={index} value={item}>
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