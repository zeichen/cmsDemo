'use strict';
var React = require('react');
var materialStore = require('../stores/materialStore')


var TreeNode = React.createClass({
    setEvent: function () {
        var el = this.getDOMNode().childNodes[0];
        var elObject = this.props.node;
        $(el).data('elObject', elObject);

        if ($(el).hasClass('draggable-el')) {
            $(el).draggable({
                start: function (event, ui) {
                    $(this).html('<' + elObject.media + ' src="' + elObject.path + '"><' + elObject.media + '/>');
                },
                stop: function (event, ui) {
                    $(this).html(elObject.name);
                },
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
        }

        var elObject = this.props.node

    },
    getInitialState: function () {
        return {
            visible: true
        };
    },
    componentDidMount: function () {
        $(this).data('elObject', this.props.node);
        this.setEvent();
    },
    render: function () {
        var childNodes;
        var classObj;

        if (this.props.node.childNodes != null) {
            childNodes = this.props.node.childNodes.map(function (node, index) {
                return <li key={index}><TreeNode node={node}/></li>
            });

            classObj = {
                togglable: true,
                "togglable-down": this.state.visible,
                "togglable-up": !this.state.visible,

            };
        } else {
            classObj = {
                "draggable-el": true

            };
        }

        var style;
        if (!this.state.visible) {
            style = {display: "none"};
        }

        return (
            <div>

                <div onClick={this.toggle} className={React.addons.classSet(classObj)} elpath={this.props.node.path}>
                    {this.props.node.name}
                </div>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>
        );
    },
    toggle: function () {
        this.setState({visible: !this.state.visible});
    }
});

var MaterialList = React.createClass({
    getInitialState: function () {
        return {
            tree: materialStore.getList()
        };
    },
    componentDidMount: function () {
        materialStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        materialStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            list: materialStore.getList()
        });
    },
    render: function () {
        return (
            <div>

                <TreeNode node={this.state.tree}/>

            </div>
        );
    }
});
module.exports = MaterialList;


