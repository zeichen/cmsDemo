var React = require('react');

var ListItem = React.createClass({

  
   componentDidMount: function () {
     
      var el=this.getDOMNode();
    
      var eventObject = {
        title: this.props.item
      };      
      $(el).data('eventObject', eventObject);
      $(el).draggable({
        zIndex: 999,
        revert: true,      
        revertDuration: 0  
      });
   },
   componentDidUpdate:function(){
     },
   render: function () {
          return (
                <li className="list-group-item external-event">
          <span
              className="glyphicon glyphicon-remove" onClick={this.props.remove.bind(null, this.props.key)}
            >
          </span>
          <span>
             {this.props.item}
          </span>
                </li>
            )
        }
});

module.exports = ListItem;