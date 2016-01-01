"use strict";


var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr= require('toastr');
var AuthorStore=require('../../stores/authorStore');
var AuthorAction=require('../../actions/authorAction');


var ManageAuthorPage = React.createClass({
	mixins:[
Router.Navigation
	],
   getInitialState: function(){
   	return {
   		author: { id: '', firstName: '', lastName: ''},
   		errors:{}
   		}
   },

   componentWillMount:function(){
var authorId =this.props.params.id;
if(authorId){
	this.setState(
	{author:AuthorStore.getAuthorById(authorId)}
		);
	}
   },
   setAuthorState:function(event){
   	var field = event.target.name;
   	var value = event.target.value;
   	this.state.author[field]=value;
   	return this.setState({author: this.state.author})
   },
   authorFormIsValid:function(){
var formIsValid = true;
this.state.errors ={};

if(this.state.author.firstName.length < 3){
	this.state.errors.firstName='First Name'
}
if(this.state.author.lastName.length < 3){
	this.state.errors.lastName='last Name'
}

   },
   saveAuthor:function(event){
     event.preventDefault();
     if(!this.authorFormIsValid()){
     //	return;
     }
     AuthorAction.createAuthor(this.state.author);
     toastr.success('saved');
     this.transitionTo('authors');
   },
   render: function(){ 
		 return (
		
		<AuthorForm 
		author={this.state.author} 
		onChange={this.setAuthorState} 
		onSave={this.saveAuthor}/>
   )}

});

module.exports = ManageAuthorPage;



   