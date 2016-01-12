"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    list: [],
    events: {},
    config: {url: 'http://localhost/calendar/process.php'}
};

var addItem = function (item) {
    _store.list.push(item);
};

var removeItem = function (index) {
    _store.list.splice(index, 1);
}

var getEventApi = function () {

}

var eventStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getList: function () {
        return _store.list;
    },
    getConfig: function () {
        return _store.config;
    },
    getEvents: function () {
        return _store.events
    },
    createEvent: function (event) {

    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case appConstants.EVENT_INIT:
            $.ajax({
                url: "http://localhost:3000/schedules.json",
                type: 'get', // Send post data
                async: false,
                success: function (data) {
                    var jsonString = JSON.stringify(data);
                    jsonString = jsonString.split('startdate').join('start');
                    jsonString = jsonString.split('enddate').join('end');
                    _store.events = JSON.parse(jsonString);
                    eventStore.emit('gotInitial');
                }
            });
            break;
        case appConstants.EVENT_CREATE:

            eventStore.emit(CHANGE_EVENT);
            break;

        case appConstants.ADD_ITEM:
            addItem(action.data);
            eventStore.emit(CHANGE_EVENT);
            break;
        case appConstants.REMOVE_ITEM:
            removeItem(action.data);
            eventStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = eventStore;
