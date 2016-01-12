var React = require('react');

var ListItem = React.createClass({


    componentDidMount: function () {

        var el = this.getDOMNode();
        console.log(this.props.item.duration);
        var eventObject = {
            title: this.props.item.title,
            CompId: this.props.item.id,
            duration:moment().startOf('day').seconds(this.props.item.duration).format('H:mm:ss')
        };
       

        $(el).data('event', {
                title: eventObject.title, // use the element's text as the event title
                duration:eventObject.duration,
                CompId:eventObject.CompId,
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
          <li className="fc-event list-group-item">
          <span className="glyphicon glyphicon-remove" onClick={this.props.remove.bind(null, this.props.item.id)} >
          </span>
          <span>
             {this.props.item.title} {moment().startOf('day')
        .seconds(this.props.item.duration)
        .format('H:mm:ss')}
          </span>
           <span className="glyphicon glyphicon-edit" onClick={this.props.edit.bind(null, this.props.item.id)}>
          </span>
            </li>
        )
    }
});

module.exports = ListItem;