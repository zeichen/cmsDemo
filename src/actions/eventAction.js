var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
//var actionType = require('../constants/actionType');

var eventActions = {
    getEvent:function(){
         AppDispatcher.handleAction({
            actionType: appConstants.EVENT_INIT
           // data: item
        });
    },
    createEvent: function (item) {
        AppDispatcher.handleAction({
            actionType: appConstants.EVENT_CREATE,
            data: item
        });
    },
    updateEvent: function (item) {
        AppDispatcher.handleAction({
            actionType: appConstants.EVENT_UPDATE,
            data: item
        })
    },
    deleteEvent: function (index) {
        AppDispatcher.handleAction({
            actionType: appConstants.EVENT_DELETE,
            data: index
        })
    }
};

module.exports = eventActions;
