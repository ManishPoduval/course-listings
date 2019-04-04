import React, {Component}  from 'react';
import Pagination from '../shared/Pagination.js';


class CourseList extends Component{
    constructor(props){
        super(props);
        this.checkProvider = this.checkProvider.bind(this);
        this.checkRecentListing = this.checkRecentListing.bind(this);
        this.checkParent = this.checkParent.bind(this);
        this.checkUniversity = this.checkUniversity.bind(this);
        this.itemCount = this.props.total;
        this.set = false;
        this.state={
            date: null, 
            length: null, 
            dataArray:[],
            lengthText:'LEN', 
            dateText:'DATE' };
    }


    componentDidMount() {
        const { selection, data} = this.props;
        
        let callbackFunction = null;

        const {
            dataArray,
            date,
            length,
        } = this.state

        if (selection && !this.set) {
           callbackFunction = this.filterDataFromSource()
        }

        let filteredData = data;

        if (callbackFunction) {
            filteredData = data.filter(callbackFunction);
        }

        if (date || length) {
            if (date) {
                this.toggleDate(filteredData)
            }
            else if (length) {
                this.toggleLength(filteredData)
            }
        }
        else {
            this.setState({dataArray: filteredData })
        }
    }
    
    checkRecentListing(item){
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
        this.setState({
            date: null, 
            length: null, 
        })
    }

    onfilterDate = (data, isDescending)=>{

        return data.sort(function(a, b) {
            let firstElement = null, secondElement = null
            if (a["Next Session Date"].split(", ")[1]) {
                firstElement = a["Next Session Date"].split(", ")[1]
            }
            if (b["Next Session Date"].split(", ")[1]) {
                secondElement = b["Next Session Date"].split(", ")[1]
            }
            if (isDescending) {
                return firstElement - secondElement
            }
            else {
                return secondElement - firstElement
            }
          });
    }

    lengthSort=(data, isDescending)=>{

        return data.sort(function(a, b) {
            if (isDescending) {
                return a['Length']- b['Length']
            }
            else {
                return b['Length'] - a['Length']
            }
          });
   }

    toggleDate=(data) => {
        this.set = false;
        if(this.state.date=== 'desc'){
            this.setState({
                date: 'asc', 
                dataArray: this.onfilterDate(data, false),
                dateText:'DATE-ASC', 
                lengthText:'LEN'
            })
        }
        else{
            this.setState({
                date: 'desc', 
                dataArray:this.onfilterDate(data, true),
                dateText:'DATE-DESC', 
                lengthText:'LEN'
            })
        }
    }

    toggleLength=(data) => {
        this.set = false;
        if(this.state.length=== 'desc'){
            this.setState({
                length: 'asc', 
                dataArray: this.lengthSort(data, false),
                dateText:'DATE', 
                lengthText:'LEN-ASC'
            })
        }
        else{
            this.setState({
                length: 'desc', 
                dataArray: this.lengthSort(data, true),
                dateText:'DATE', 
                lengthText:'LEN-DESC'
            })
        }
    }

    filterDataFromSource = () => {
        const { selection, data } = this.props;
        switch(selection) {
            case 'provider':
                this.set = true
                this.itemCount = data.filter(this.checkProvider).length;
                return this.checkProvider
                break;
            case 'parent':
                this.set = true;
                this.itemCount = data.filter(this.checkParent).length;
                return this.checkParent
                break;
            case 'university':
                this.set = true
                this.itemCount = data.filter(this.checkUniversity).length;
                return  this.checkUniversity
                break;
            default:
                return this.checkRecentListing;
        }
    }

    render(){

        const {
            selection,
            data,
        } = this.props;

        let callbackFunction = null;

        const {
            dataArray,
            date,
            length,
        } = this.state

        if (selection && !this.set) {
           callbackFunction = this.filterDataFromSource()
        }
        
        let filteredData = data;

        if (callbackFunction) {
            filteredData = data.filter(callbackFunction);
        }

        return (
            <div className="courseList">
                <div className="filterWrapper">
                    <div className="filterCount">Courses listed : {this.itemCount}</div>
                    <div className="filterContianer">
                        <h6 className="filterLabel">Filter by:</h6>
                        <div style={{display:'flex', direction:'row', justifyContent:'center'}}>
                            <button className="sortButtons" onClick={event => this.toggleDate(filteredData)}>{this.state.dateText}</button>
                            <button className="sortButtons"onClick={event => this.toggleLength(filteredData)}>{this.state.lengthText}</button>
                        </div>
                    </div>
                </div>    
                <Pagination data={date || length ? dataArray : filteredData}/>
            </div>
        )
    }   
}
export default CourseList;
