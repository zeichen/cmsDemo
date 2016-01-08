var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var compStore = require('../stores/compStore');
var compActions = require('../actions/compActions');

var CompositionList = React.createClass({
    getInitialState: function () {
        return {
            list: compStore.getList()
        }
    },
    componentDidMount: function () {
        compStore.addChangeListener(this._onChange);

        myList = new dhtmlXList({
            container: "data_container1",
            type: {
                template: "#Package# : #Version#<br/>#Maintainer#",
                height: 40
            },
            drag: true
        });
        myList.attachEvent("onBeforeDrag", function (context, e) {
            //  context.html = "<div style='background-color:white; font-family:Tahoma; padding:10px;'>Drag "+context.source.length+" item(s)</div>";
            return true;
        });
        myList.add({
            Package: "drag this",
            Version: "0.1",
            Maintainer: "dhtmlx"
        });
        myList.add({
            Package: "drag this",
            Version: "0.2",
            Maintainer: "dhtmlx"
        });
        myList.add({
            Package: "drag this",
            Version: "0.3",
            Maintainer: "dhtmlx"
        });
        myList.add({
            Package: "drag this",
            Version: "0.4",
            Maintainer: "dhtmlx"
        });
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
            <div>
                <table border="0" cellspacing="5" cellpadding="5">
                    <tr>
                        <td>
                            <div id="data_container1"
                                 style={{border: '1px solid #A4BED4', backgroundColor: 'white', width:250, height:800}}/>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
});

module.exports = CompositionList;