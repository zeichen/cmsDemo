var React = require('react');
var ListItem = require('./listItem');

var List = React.createClass({

    setEvent: function () {
        //   console.log(this.getDOMNode());

    },
    componentDidMount: function () {
        console.log(this.props.items)
    },
    componentDidUpdate: function () {

    },
    render: function () {

        var listItems = this.props.items.map(function (item, index) {
            return (
                <ListItem key={index} item={item} remove={this.props.remove.bind(null, index)}/>
            )

        }.bind(this));
        return (
            <ul className="nav nav-sidebar external-events list-group">
                {listItems}
            </ul>
        )
    }
});

module.exports = List;