var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var compStore = require('../../stores/compStore');
var compActions = require('../../actions/compActions');
var Router = require('react-router');

var ListContainer = React.createClass({
    mixins:[
    Router.Navigation
    ],

    setEvent: function () {
        //console.log( $('.external-event'));
    },
    getInitialState: function () {
        return {
            list: compStore.getList()
        }
    },
    componentDidMount: function () {
        compStore.on('API_CompositionList',this._loadList)
        compStore.addChangeListener(this._onChange);
        compActions.getList();
        this.setEvent();

    },
    _loadList:function(){
        this.setState({list:compStore.getList()});
    },
    componentWillUnmount: function () {
        compStore.removeListener('API_CompositionList',this._loadList)
        compStore.removeChangeListener(this._onChange);
    },
    handleAddItem: function (newItem) {
        compActions.addItem(newItem);
    },
    handleRemoveItem: function (_id) {
       
        compActions.removeItem(_id);
    },
    handleEditItem: function (_id) {
        //compActions.removeItem(index);
    console.log(_id)
    this.transitionTo("editor",{},{id:_id});
    },
    componentDidUpdate: function () {
        this.setEvent();
    },
    _onChange: function () {
        this.setState({
            list: compStore.getList()
        });
    },
    render: function () {
        return (
            <div className="ListContainer">
                <h3 className="text-center"> Composition List </h3>
                <AddItem add={this.handleAddItem}/>
                <List items={this.state.list} remove={this.handleRemoveItem} edit={this.handleEditItem}/>
            </div>
        )
    }
});

module.exports = ListContainer;