var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var compActions = {
    getList: function () {
        AppDispatcher.handleAction({
            actionType: appConstants.COMP_GETLIST,
            data: null
        });
    },
    addItem: function (item) {
        AppDispatcher.handleAction({
            actionType: appConstants.COMP_ADD,
            data: item
        });
    },
    editItem: function (data) {
        AppDispatcher.handleAction({
            actionType: appConstants.COMP_UPDATE,
            data: data
        });
    },
    removeItem: function (id) {
        AppDispatcher.handleAction({
            actionType: appConstants.COMP_DELETE,
            data: id
        })
    },
    getItem: function (id) {
        AppDispatcher.handleAction({
            actionType: appConstants.COMP_LOAD,
            data: id
        })
    }
};

module.exports = compActions;
