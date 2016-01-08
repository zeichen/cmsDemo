'use strict';
var React = require('react');

var tree = {
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
};

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
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
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
    render: function () {
        return (
            <div>

                <TreeNode node={tree}/>
               
            </div>
        );
    }
});


module.exports = MaterialList;


