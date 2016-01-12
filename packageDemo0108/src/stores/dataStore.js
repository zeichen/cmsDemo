var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

var _items = [];
var _events = [
    {
        title: 'All Day Event',
        start: new Date()
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date(),
        allDay: false,
        className: 'info'
    }
]
var DataStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getAllItems: function () {
        return _items;
    },
    getItemById: function () {

    }

});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            // _authors=action.initialData.authors;
            AuthorStore.emitChange();
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_ASIGN:
            //_author.push(action.author);
            AuthorStore.emitChange();
            break;
        default:
        //
    }

});

module.exports = DataStore;