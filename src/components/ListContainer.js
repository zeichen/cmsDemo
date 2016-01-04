var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var compStore = require('../stores/compStore');
var compActions = require('../actions/compActions');

var ListContainer = React.createClass({
    setEvent:function(){
        console.log( $('.external-event'));
    $('.external-event').each(function() {
       var eventObject = {
        title: $.trim($(this).text()) // use the element's text as the event title
      };

      $(this).data('eventObject', eventObject);
      $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      });
      
    });
    },
    getInitialState: function () {
        return {
            list: compStore.getList()
        }
    },
    componentDidMount: function () {
        compStore.addChangeListener(this._onChange);
       this.setEvent();
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
    componentDidUpdate:function(){
         this.setEvent();
     },
    _onChange: function () {
        this.setState({
            list: compStore.getList()
        });
          this.setEvent();
    },
    render: function () {
        return (
            <div className="ListContainer">
                <h3 className="text-center"> Composition List </h3>
                <AddItem add={this.handleAddItem}/>
                <List items={this.state.list} remove={this.handleRemoveItem}/>
            </div>
        )
    }
});

module.exports = ListContainer;