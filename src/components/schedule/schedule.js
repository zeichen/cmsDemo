"use strict";
var React = require('react');
var Router = require('react-router');
var dataStore = require('../../stores/DataStore');


function init() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(), "month");

    scheduler.templates.xml_date = function (value) {
        return new Date(value);
    };
    //scheduler.load("/data", "json");

    //	var dp = new dataProcessor("/data");
    //	dp.init(scheduler);
    //	dp.setTransactionMode("POST", false);
}

var Schedule = React.createClass({
    getInitialState: function () {
        return {
            //  list: dataStore.getList()
        };
    },
    componentDidMount: function () {
        init();
        console.log(scheduler);
        scheduler.attachEvent("onExternalDragIn", function(id, source, event){
      //  var label = tree.getItemText(tree._dragged[0].id);
       // scheduler.getEvent(id).text = label;
         console.log(source);
        return true;
});
    },
    render: function () {
        return (
            <div className="container-fluid"> 
                <div id="scheduler_here" className="dhx_cal_container">

                    <div className="dhx_cal_navline">
                        <div className="dhx_cal_prev_button">&nbsp;</div>
                        <div className="dhx_cal_next_button">&nbsp;</div>
                        <div className="dhx_cal_today_button"></div>
                        <div className="dhx_cal_date"></div>
                        <div className="dhx_cal_tab" name="day_tab"></div>
                        <div className="dhx_cal_tab" name="week_tab"></div>
                        <div className="dhx_cal_tab" name="month_tab"></div>
                    </div>
                    <div className="dhx_cal_header">
                    </div>
                    <div className="dhx_cal_data">
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Schedule; 