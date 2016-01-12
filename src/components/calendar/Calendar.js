var React = require('react');
var fullCalendar = require('fullcalendar');
var eventStore = require('../../stores/eventStore');
var eventAction = require('../../actions/eventAction');

function getFreshEvents() {
    $.ajax({
        url: "http://localhost:3000/schedules.json",
        type: 'get', // Send post data
        async: false,
        success: function (data) {
            var jsonString = JSON.stringify(data);
            jsonString = jsonString.split('startdate').join('start');
            jsonString = jsonString.split('enddate').join('end');
            $('#calendar').fullCalendar('addEventSource', JSON.parse(jsonString));
        }
    });
}


var Calendar = React.createClass({
    getInitialState: function () {
        return {
            events: {}
        };
    },
    componentWillUnmount: function () {
        // eventStore.removeChangeListener(this._calendarInit);
        eventStore.removeListener('gotInitial', this._calendarInit);
    },
    componentDidMount: function () {
        eventStore.on('gotInitial', this._calendarInit);
        // eventStore.addChangeListener(this._calendarInit);
        eventAction.getEvent();
    },
    _calendarInit: function () {
        this.state.events = eventStore.getEvents();
        context.init({preventDoubleContext: true});
        // $.getScript("vendor/fullcalendar/fullcalendar.min.js", function () {


        $('#calendar').fullCalendar({
            events: this.state.events//JSON.parse(json_events)
            , header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultView: 'agendaWeek',
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function (event) {
                // console.log(event);
                //$('#calendar').fullCalendar('updateEvent',event);
            },

            select: function (start, end, jsEvent, view, resource) {
                console.log(
                    'select callback',
                    start.format(),
                    end.format(),
                    resource ? resource.id : '(no resource)'
                );
            },
            eventReceive: function (event) {
                // console.log(eventStore.getConfig());
                //  console.log(event)
                $('#calendar').fullCalendar('updateEvent', event);
                var title = event.title;
                var start = event.start.format("YYYY-MM-DD[T]HH:mm:SS");
                var end = event.end.format("YYYY-MM-DD[T]HH:mm:SS");
                var duration = event.duration;
                //   console.log(duration);
                //   console.log(event)
                var form = new FormData();
                form.append("title", title);
                form.append("startdate", start);
                form.append("enddate", event.end);
                form.append("allday", "false");
                form.append("CompId", event.CompId);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:3000/schedules.json",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    event._id = JSON.parse(response).id;
                    //event._id=newData.id;
                });

                // console.log(event);*/
            },
            eventDrop: function (event, delta, revertFunc) {
                var title = event.title;
                var start = event.start.format();
                var end = (event.end == null) ? start : event.end.format();
                var data = 'type=resetdate&title=' + title + '&start=' + start + '&end=' + end + '&eventid=' + event.id
                // eventAction.createEvent(data);

                var form = new FormData();
                form.append("title", title);
                form.append("startdate", start);
                form.append("enddate", end);
                form.append("allday", "false");
                form.append("CompId", "1");

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:3000/schedules/" + event._id + ".json",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache",
                        "postman-token": "725dbf40-ccf6-8a51-cd31-b71b480db5f6"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
//  console.log(response);

                    // if(response.status != 'success')  {revertFunc();}
                });
                $('#calendar').fullCalendar('updateEvent', event);

            },
            eventClick: function (event, jsEvent, view) {
                /*
                 var title = prompt('Event Title:', event.title, { buttons: { Ok: true, Cancel: false} });
                 if (title){
                 event.title = title;
                 console.log('type=changetitle&title='+title+'&eventid='+event.id);
                 $.ajax({
                 url: eventStore.getConfig().url,
                 data: 'type=changetitle&title='+title+'&eventid='+event.id,
                 type: 'POvar form = new FormData();
                 form.append("title", "putputput");
                 form.append("startdate", "2016-01-13T04:00:00.000Z");
                 form.append("enddate", "2016-01-13T07:00:00.000Z");
                 form.append("allday", "false");
                 form.append("CompId", "1");

                 var settings = {
                 "async": true,
                 "crossDomain": true,
                 "url": "http://localhost:3000/schedules/50.json",
                 "method": "PUT",
                 "headers": {
                 "cache-control": "no-cache",
                 "postman-token": "725dbf40-ccf6-8a51-cd31-b71b480db5f6"
                 },
                 "processData": false,
                 "contentType": false,
                 "mimeType": "multipart/form-data",
                 "data": form
                 }

                 $.ajax(settings).done(function (response) {
                 console.log(response);
                 });ST',
                 dataType: 'json',
                 success: function(response){
                 if(response.status == 'success')
                 $('#calendar').fullCalendar('updateEvent',event);
                 },
                 error: function(e){
                 alert('Error processing your request: '+e.responseText);
                 }
                 });
                 }*/
            },
            eventResize: function (event, delta, revertFunc) {
                var title = event.title;
                var start = event.start.format();
                var end = (event.end == null) ? start : event.end.format();
                //   console.log(end);
                var form = new FormData();
                form.append("title", title);
                form.append("startdate", start);
                form.append("enddate", end);
                form.append("allday", "false");
                form.append("CompId", "1");

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:3000/schedules/" + event.id + ".json",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache",
                        "postman-token": "725dbf40-ccf6-8a51-cd31-b71b480db5f6"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    // console.log(response);
                    // if(response.status != 'success')  {revertFunc();}
                });

            },
            _onev: function () {
                //   console.log('onevevevev')
            },

            eventRender: function (event, element) {
                // console.log(element);
                element.bind('mousedown', function (mouseEvent) {
                    if (mouseEvent.which == 3) {
                        //  console.log(event);
                        context.attach('#calendar', [
                            {
                                text: 'delete', action: function (e) {
                                e.preventDefault();
                                // $('#calendar').fullCalendar('removeEvents', event._id);

                                var form = new FormData();
                                form.append("title", "putputput");
                                form.append("startdate", "2016-01-11T04:00:00.000Z");
                                form.append("enddate", "2016-01-11T08:00:00.000Z");
                                form.append("allday", "false");
                                form.append("CompId", "1");
                                var settings = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "http://localhost:3000/schedules/" + event._id + ".json",
                                    "method": "DELETE",
                                    "headers": {
                                        "cache-control": "no-cache"
                                    }
                                }

                                $.ajax(settings).done(function (response) {
                                    $('#calendar').fullCalendar('removeEvents');
                                    getFreshEvents();
                                });


                            }
                            }
                        ]);
                    }
                });
            }
        });

    },
    render: function () {
        return (
            <div>

                <div id='calendar'></div>
            </div>

        );
    }

});

module.exports = Calendar;


