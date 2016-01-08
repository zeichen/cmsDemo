var React = require('react');


var Calendar = React.createClass({

    componentDidMount: function () {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
         context.init({preventDoubleContext: true});
        $.getScript("vendor/fullcalendar/fullcalendar.min.js", function () {
   

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultView:'agendaWeek',
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function(event) {
                console.log(event);
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
        select: function(start, end, jsEvent, view, resource) {
        console.log(
        'select callback',
        start.format(),
        end.format(),
        resource ? resource.id : '(no resource)'
        );
        },
        eventDragStop: function(event,jsEvent) {
    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    if( (300 <= jsEvent.pageX) & (jsEvent.pageX <= 500) & (130 <= jsEvent.pageY) & (jsEvent.pageY <= 170)){
      alert('delete: '+ event.id);
      $('#calendar').fullCalendar('removeEvents', event.id);
    }
},
            eventRender: function (event, element) {
        element.bind('mousedown', function (e) {
            if (e.which == 3) {
               console.log(event);
                     context.attach('#calendar', [
                {
                    text: 'delete', action: function (e) {
                   e.preventDefault();
                   $('#calendar').fullCalendar('removeEvents', event._id);
                }
                }
            ]);
            }
        });
    }
        });


             

        });


        // console.log($('body').html());
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


