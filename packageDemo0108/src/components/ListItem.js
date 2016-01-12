var React = require('react');

var ListItem = React.createClass({


    componentDidMount: function () {

        var el = this.getDOMNode();

        var eventObject = {
            title: this.props.item
        };
       

        $(el).data('event', {
                title: eventObject.title, // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
           

        $(el).draggable({
     //     helper: 'clone',
          opacity:0.7,
        //  drag:function(){$('.sidebar').css("overflow-y", "fixed");},
        //  stop:function(){$('.sidebar').css("overflow-y", "scroll");},            
            zIndex: 999,
            revert: true,
            revertDuration: 0
        });
    },
    componentDidUpdate: function () {
    },
    render: function () {
        return (
            <li className="list-group-item fc-event list-group-item">
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