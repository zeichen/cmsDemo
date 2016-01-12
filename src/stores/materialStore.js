var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

var _items = [];
var _store = {
    list: {
        name: "assets",
        childNodes: [
            {
                name: "banner", childNodes: [
                {name: "3.jpg", path: 'assets/banner/3.jpg', media: 'img'},
                {name: "4.jpg", path: 'assets/banner/4.jpg', media: 'img'},
                {name: "7.jpg", path: 'assets/banner/7.jpg', media: 'img'},
                {name: "9.jpg", path: 'assets/banner/9.jpg', media: 'img'},
                {name: "12.jpg", path: 'assets/banner/12.jpg', media: 'img'}
            ]
            },
            {
                name: "video", childNodes: [
                {name: "0523a.mp4", path: 'assets/video/0523a.mp4', media: 'video'},
                {name: "Sequence.mp4", path: 'assets/video/Sequence.mp4', media: 'video'},
            ]
            }
        ]
    }


}
var materialStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getList: function () {
        return _store.list;
    },

});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:

            break;

        default:
        //
    }

});

module.exports = materialStore;