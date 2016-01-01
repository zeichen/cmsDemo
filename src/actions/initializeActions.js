"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes =require('../constants/actionTypes')

var InitailizeActions={
   initApp:function(){
       Dispatcher.dispatch({
           actionType:ActionTypes.INITAILIZE,
           initialData:{
               authors:AuthorApi.getAllAuthors()
           }
       })
   }

}

module.exports = InitailizeActions;
