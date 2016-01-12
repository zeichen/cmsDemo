"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var InitailizeActions = {
    initApp: function () {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITAILIZE,
            initialData: {}
        })
    }

};

module.exports = InitailizeActions;
