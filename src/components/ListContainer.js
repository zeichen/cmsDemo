var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var compStore = require('../stores/compStore');
var compActions = require('../actions/compActions');

var ListContainer = React.createClass({
    getInitialState: function () {
        return {
            list: compStore.getList()
        }
    },
    componentDidMount: function () {
        compStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        compStore.removeChangeListener(this._onChange);
    },
    handleAddItem: function (newItem) {
        compActions.addItem(newItem);
    },
    handleRemoveItem: function (index) {
        compActions.removeItem(index);
    },
    _onChange: function () {
        this.setState({
            list: compStore.getList()
        })
    },
    render: function () {
        return (
            <div className="">

                <h3 className="text-center"> Composition List </h3>
                <AddItem add={this.handleAddItem}/>
                <List items={this.state.list} remove={this.handleRemoveItem}/>
            </div>
        )
    }
});

module.exports = ListContainer;