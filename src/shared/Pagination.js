import React, {Component}  from 'react';
import Course from '../components/Course';
import $ from 'jquery';
import "./Pagination.css"

class Pagination extends React.Component {
    constructor() {
      super();
      this.state = {
        todos: [],
        currentPage: 1,
          todosPerPage: 5,
          upperPageBound: 5,
          lowerPageBound: 0,
          isPrevBtnActive: 'disabled',
          isNextBtnActive: '',
          pageBound: 5
      };
      this.handleClick = this.handleClick.bind(this);
      this.btnDecrementClick = this.btnDecrementClick.bind(this);
      this.btnIncrementClick = this.btnIncrementClick.bind(this);
      this.btnNextClick = this.btnNextClick.bind(this);
      this.btnPrevClick = this.btnPrevClick.bind(this);
      // this.componentDidMount = this.componentDidMount.bind(this);
      this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }

    componentDidUpdate() {
          $("ul li.active").removeClass('active');
          $('ul li#'+this.state.currentPage).addClass('active');
    }
    handleClick(event) {
      let listid = Number(event.target.id);
      this.setState({
        currentPage: listid
      });
      $("ul li.active").removeClass('active');
      $('ul li#'+listid).addClass('active');
      this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
      let totalPage = Math.ceil(this.props.data.length / this.state.todosPerPage);
      this.setState({isNextBtnActive: 'disabled'});
      this.setState({isPrevBtnActive: 'disabled'});
      if(totalPage === listid && totalPage > 1){
          this.setState({isPrevBtnActive: ''});
      }
      else if(listid === 1 && totalPage > 1){
          this.setState({isNextBtnActive: ''});
      }
      else if(totalPage > 1){
          this.setState({isNextBtnActive: ''});
          this.setState({isPrevBtnActive: ''});
      }
  }

    btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }

    btnDecrementClick() {
      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      let listid = this.state.upperPageBound - this.state.pageBound;
      this.setState({ currentPage: listid});
      this.setPrevAndNextBtnClass(listid);
    }

    btnPrevClick() {
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
    }

    btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
    }

    render() {

    const { 
        todos,
        currentPage, 
        todosPerPage,
        upperPageBound,
        lowerPageBound,
        isPrevBtnActive,
        isNextBtnActive 
    } = this.state;

      // Logic for displaying current todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentCards = this.props.data.slice(indexOfFirstTodo, indexOfLastTodo);

      const {
        data,callbackFunction
    } = this.props;
      const renderCards = currentCards.map(todo => {
        return <Course key={todo['Course Id']} data={todo} />;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.data.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          if(number === 1 && currentPage === 1){
              return(
                  <li key={number} className='active' id={number}><a href='#' className="buttonCust" id={number} onClick={this.handleClick}>{number}</a></li>
              )
          }
          else if((number < upperPageBound + 1) && number > lowerPageBound){
              return(
                  <li key={number} id={number}><a href='#' className="buttonCust" id={number} onClick={this.handleClick}>{number}</a></li>
              )
          }
      });

      let pageIncrementBtn = null;

      if(pageNumbers.length > upperPageBound){
          pageIncrementBtn = <li className=''><a href='#' className="buttonCust" onClick={this.btnIncrementClick}> &hellip; </a></li>
      }

      let pageDecrementBtn = null;

      if(lowerPageBound >= 1){
          pageDecrementBtn = <li className=''><a href='#' className="buttonCust" onClick={this.btnDecrementClick}> &hellip; </a></li>
      }

      let renderPrevBtn = null;

      if(isPrevBtnActive === 'disabled') {
          renderPrevBtn = <li className={isPrevBtnActive}><span className="buttonCust" id="btnPrev"> Prev </span></li>
      }
      else{
          renderPrevBtn = <li className={isPrevBtnActive}> <a href='#' className="buttonCust" id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
      }

      let renderNextBtn = null;

      if(isNextBtnActive === 'disabled') {
          renderNextBtn = <li className={isNextBtnActive}><span className="buttonCust" id="btnNext"> Next </span></li>
      }
      else{
          renderNextBtn = <li className={isNextBtnActive}><a href='#' className="buttonCust" id="btnNext" onClick={this.btnNextClick}> Next </a></li>
      }

      if (!renderCards.length) {
        renderNextBtn = renderPrevBtn = null;
      }

      return (
        <div>
            {
                renderCards.length ? (
                    <ul>
                        {renderCards}
                    </ul>
                ) : null
            }
          <div style={{width:'100%',textAlign:'center'}}>
          <ul className="pagination" style={{width:'100%',textAlign:'center',  justifyContent: 'space-around',flexDirection:'row'}}>
            {renderPrevBtn}
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            {renderNextBtn}
          </ul>
          </div>
        </div>
      );
    }
  }

export default Pagination;