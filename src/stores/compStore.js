"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var lodash = require('lodash');

var CHANGE_EVENT = 'change';

var _store = {
    list: [],
    currentData: {}
};


var addItem = function (item) {
    _store.list.push(item);
};

var setItemData = function (index, data) {
    _store.list[index] = data;
};

var removeItem = function (_id) {
//var index=_.find(_store.list,function(o){return o.id=_id;});
//_store.list.splice(index, 1);

    _.remove(_store.list, function (obj) {
        return obj.id === _id;
    });


}
var editItem = function (index, data) {
    _store.list[index] = data;
}

var compStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getList: function () {
        return _store.list;
    },
    getComposition: function () {
        return _store.currentData;
    },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case appConstants.COMP_GETLIST:
            $.ajax({
                url: "http://localhost:3000/compositions.json",
                type: 'get', // Send post data
                async: false,
                success: function (data) {
                    //var jsonString=JSON.stringify(data);
                    _store.list = data
                    compStore.emit('API_CompositionList');
                }
            });
            break;
        case appConstants.COMP_LOAD:
            $.ajax({
                url: "http://localhost:3000/compositions/" + action.data + ".json",
                type: 'get', // Send post data
                async: false,
                success: function (data) {
                    //var jsonString=JSON.stringify(data);
                    //_store.list.push(data);
                    _store.currentData = data
                    compStore.emit('compLoaded');
                }
            });
            compStore.emit(CHANGE_EVENT);
            break;
        case appConstants.COMP_UPDATE:
            console.log(payload);
            editItem(action.data);
            var form = new FormData();
            form.append("title", action.data.title);
            form.append("data", action.data.data);
            form.append("duration", action.data.duration);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/compositions/" + action.data.id + ".json",
                "method": "PUT",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
            //compStore.emit(CHANGE_EVENT);
            break;
        case appConstants.COMP_ADD:
            var form = new FormData();
            console.log(action);
            form.append("title", action.data.title);
            form.append("data", action.data.data);
            form.append("duration", action.data.duration);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/compositions.json",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
                addItem(JSON.parse(response));
                compStore.emit(CHANGE_EVENT);
                compStore.emit('compAdded');
            });
            break;
        case appConstants.COMP_DELETE:

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/compositions/" + action.data + ".json",
                "method": "DELETE",
            }
            $.ajax(settings).done(function (response) {
                //console.log(response);
                removeItem(action.data);
                compStore.emit(CHANGE_EVENT);
            });

            break;
        default:
            return true;
    }
});

module.exports = compStore;
