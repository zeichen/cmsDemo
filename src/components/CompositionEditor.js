"use strict";

var React = require('react');
var Router = require('react-router');
var MaterialList = require('./MaterialList');
var _ = require('lodash');
var compStore = require('../stores/compStore');
var compActions = require('../actions/compActions');

//helper for not clean up objects
function removeCanvasObj() {
    _.forEach(window._canvas._objects, function (o, key) {
        window._canvas.remove(o);
    });
    if (window._canvas._objects.length != 0) {
        removeCanvasObj();
    }
}


function loadJSONHelper(jsonString) {
    var json = {};
    try {
        json = JSON.parse(jsonString);
    } catch (e) {
        json = '{"objects":[],"background":""}'
    }
    window._canvas.loadFromJSON(json, function () {
            window._canvas.add(_gridgroup);
            window._canvas.sendToBack(_gridgroup);
            window._canvas.renderAll.bind(canvas);
        }
        , function (o, object) {
            fabric.log(o, object);
            if (object.type == "image" && object._element == null) {
                //   console.log(object);
                var vid = document.createElement('video');
                vid.src = object.src;
                vid.loop = true;
                vid.controls = true;
                object._element = vid;
                object._originalElement = vid;
                object.getElement().play();
            }
        });
}
var _gridgroup = {};
var CompositionEditor = React.createClass({

    getInitialState: function () {

        /*
         console.log(this.props.query.id)
         if(!this.props.query.id){
         return {
         //id:compStore.getList().length,
         //composition:{title:'new',data:{},duration:3600}
         } 
         }else{
         return {
         id:this.props.query.id,
         composition:_.find(compStore.getList(),'id',this.props.query.id)
         }
         }
         */

        //console.log(_.find(compStore.getList(),'id',this.props.query.id));

        return {

            composition: {
                id: '',
                title: 'new',
                data: '',
                duration: 3600
            },
            textSize:40
            //  id:compStore.getList()[0].id,
            //  composition:compStore.getList()[0]
        }

    },
    componentWillUnmount: function () {
        compStore.removeListener('compAdded', this._compAdded);
        compStore.removeListener('compLoaded', this._compLoaded);
        removeCanvasObj();
    },
    initCanvas: function () {


    },
    _compAdded: function () {
        // console.log(compStore.getList()[compStore.getList().length-1]);
        this.setState({
            composition: compStore.getList()[compStore.getList().length - 1]
        })
    },
    _compLoaded: function () {
        this.setState({
            composition: compStore.getComposition()
        })
        //  console.log(compStore.getComposition());
        //   console.log(this.state.composition);
        loadJSONHelper(compStore.getComposition().data)
    },
    componentDidMount: function () {
        compStore.on('compAdded', this._compAdded);
        compStore.on('compLoaded', this._compLoaded);
        var _this = this;
        fabric.Object.prototype.set({
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            padding: 5
        });

        // initialize fabric canvas and assign to global windows object for debug
        var canvas = window._canvas = new fabric.Canvas('canvas');
        canvas.selectionColor = 'rgba(0,255,0,0.3)';
        var json = '{}';
        canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (o, object) {
            fabric.log(o, object);
        });

        if (!this.props.query.id) {
            // compActions.addItem({ title:'new',data:'{}',duration:3600 });
        } else {
            compActions.getItem(this.props.query.id);
        }


        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });

        fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function (e) {
            e.preventDefault();

        });


        // create grid
        var grid = 15;
        var gridgroup = new fabric.Group([]);
        _gridgroup = gridgroup;
        for (var i = 0; i < (720 / grid); i++) {
            gridgroup.add(new fabric.Line([i * grid, 0, i * grid, 480], {stroke: '#ccc', selectable: false}));
            gridgroup.add(new fabric.Line([0, i * grid, 720, i * grid], {stroke: '#ccc', selectable: false}))
        }
        canvas.add(gridgroup);
        context.init({preventDoubleContext: true});

        // snap to grid
        canvas.on('object:moving', function (options) {
            options.target.set({
                left: Math.round(options.target.left / grid) * grid,
                top: Math.round(options.target.top / grid) * grid
            });
        });


        var json = this.state.composition.data;
        //removeCanvasObj();
        //var json = $('#canvasJSON').text();
        try {
            JSON.parse(json);
        } catch (e) {
            json = '{"objects":[],"background":""}'
        }


        canvas.on('object:selected', function (options) {
            context.attach('.canvascontext', [
                {
                    text: 'delete', action: function (e) {
                    e.preventDefault();
                    canvas.getActiveObject().remove();
                    context.destroy('.canvascontext')
                }
                },
                {
                    text: 'bringToFront', action: function (e) {
                    e.preventDefault();
                    canvas.bringToFront(canvas.getActiveObject())
                }
                },
                {
                    text: 'sendToBack', action: function (e) {
                    e.preventDefault();
                    canvas.sendToBack(canvas.getActiveObject());
                    canvas.sendToBack(gridgroup);

                }
                },
                {
                    text: 'bringForward', action: function (e) {
                    e.preventDefault();
                    canvas.bringForward(canvas.getActiveObject());

                }
                },
                {
                    text: 'sendBackwards', action: function (e) {
                    e.preventDefault();
                    canvas.sendBackwards(canvas.getActiveObject());
                    canvas.sendToBack(gridgroup);
                }
                }
            ]);
        });

        canvas.on('object:removed', function (options) {
            console.log(options)
            try {
                var el = options.target.getElement();
            } catch (e) {
                return false;
            }
            switch (el.nodeName.toUpperCase()) {
                case "VIDEO":
                    el.pause();
                    el.src = "";
                    break;
            }
        });


        $("#canvas").droppable({
            drop: function (event, ui) {
                console.log(event);
                var el = event.toElement;
                console.log($(el).data('elObject'));
                switch ($(el).data('elObject').media) {
                    case 'img':
                        var img = new Image();
                        img.src = $(el).data('elObject').path;
                        var imgInstance = new fabric.Image(img, {
                            left: event.pageX - $('#canvas').offset().left,
                            top: event.pageY - $('#canvas').offset().top,
                            opacity: 0.95
                        });
                        canvas.add(imgInstance);
                        break;
                    case 'video':
                        var vid = document.createElement('video');
                        vid.src = $(el).data('elObject').path;
                        vid.loop = true;
                        vid.controls = true;
                        var videoInstance = new fabric.Image(vid, {
                            left: event.pageX - $('#canvas').offset().left,
                            top: event.pageY - $('#canvas').offset().top,
                            width: 300, height: 200,
                        });
                        canvas.add(videoInstance);
                        videoInstance.getElement().play();
                        break;

                    default:
                        break;

                }
            }
        });

        var canvases = [canvas];

        function setStyle(object, styleName, value) {
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style[styleName] = value;
                object.setSelectionStyles(style);
            }
            else {
                object[styleName] = value;
            }
        }

        function getStyle(object, styleName) {
            return (object.getSelectionStyles && object.isEditing)
                ? object.getSelectionStyles()[styleName]
                : object[styleName];
        }


        /*-------------------UI-control--------------------------*/


        function addHandler(id, fn, eventName) {
            document.getElementById(id)[eventName || 'onclick'] = function () {
                var el = this;
                canvases.forEach(function (canvas, obj) {
                    if (obj = canvas.getActiveObject()) {
                        fn.call(el, obj);
                        canvas.renderAll();
                    }
                });
            };
        }

        addHandler('bold', function (obj) {
            var isBold = getStyle(obj, 'fontWeight') === 'bold';
            setStyle(obj, 'fontWeight', isBold ? '' : 'bold');
        });

        addHandler('italic', function (obj) {
            var isItalic = getStyle(obj, 'fontStyle') === 'italic';
            setStyle(obj, 'fontStyle', isItalic ? '' : 'italic');
        });

        addHandler('underline', function (obj) {
            var isUnderline = (getStyle(obj, 'textDecoration') || '').idOf('underline') > -1;
            setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
        });

        addHandler('line-through', function (obj) {
            var isLinethrough = (getStyle(obj, 'textDecoration') || '').idOf('line-through') > -1;
            setStyle(obj, 'textDecoration', isLinethrough ? '' : 'line-through');
        });

        addHandler('color', function (obj) {
            setStyle(obj, 'fill', this.value);
        }, 'onchange');

        addHandler('bg-color', function (obj) {
            setStyle(obj, 'textBackgroundColor', this.value);
        }, 'onchange');

        addHandler('size', function (obj) {
            setStyle(obj, 'fontSize', parseInt(this.value, 10));
        }, 'onchange');


        $('#textbutton').click(function (event) {
            /* Act on the event */
            var iText = new fabric.IText('hello\nworld', {
                left: 50,
                top: 50,
                fontFamily: 'Helvetica',
                fill: '#fff',
                lineHeight: 1.1,
                styles: {
                    0: {
                        0: {textDecoration: 'underline', fontSize: 80},
                        1: {textBackgroundColor: 'red'}
                    },
                    1: {
                        0: {textBackgroundColor: 'rgba(0,255,0,0.5)'},
                        4: {fontSize: 20}
                    }
                }
            });
            canvas.add(iText);
        });

        $('#outputJSON').click(function (event) {
            /* Act on the event */
            canvas.remove(gridgroup);
            var jsonString = JSON.stringify(canvas);
            $('#canvasJSON').text(jsonString);
            canvas.add(gridgroup);
            canvas.sendToBack(gridgroup);

        });
        $('#loadJSON').click(function (event) {
            removeCanvasObj();
            var json = $('#canvasJSON').text();
            try {
                JSON.parse(json);
            } catch (e) {
                json = '{"objects":[],"background":""}'
            }
            canvas.loadFromJSON(json, function () {
                    canvas.add(gridgroup);
                    canvas.sendToBack(gridgroup);
                    canvas.renderAll.bind(canvas);
                }
                , function (o, object) {
                    fabric.log(o, object);
                    if (object.type == "image" && object._element == null) {
                        console.log(object);
                        var vid = document.createElement('video');
                        vid.src = object.src;
                        vid.loop = true;
                        vid.controls = true;
                        object._element = vid;
                        object._originalElement = vid;
                        object.getElement().play();
                    }
                });
        });


        $('#Save').click(function (event) {
            canvas.remove(gridgroup);
            var jsonString = JSON.stringify(canvas);
            $('#canvasJSON').text(jsonString);
            canvas.add(gridgroup);
            console.log(_this)
            canvas.sendToBack(gridgroup);
            if (_this.state.composition.id == '') {
                _this.state.composition.data = jsonString;
                compActions.addItem(_this.state.composition)
            } else {
                _this.state.composition.data = jsonString;
                compActions.editItem(_this.state.composition)
            }

        });

        $('#setGrid').click(function (event) {
            if (gridgroup.visible) {
                gridgroup.setVisible(false);
            } else {
                gridgroup.setVisible(true);
            }
            ;
        });

    }, changeTitle: function (event) {
        this.state.composition.title = event.target.value;
        this.setState({composition: this.state.composition})
    },
    changeduration: function (event) {
        this.state.composition.duration = event.target.value;
        this.setState({composition: this.state.composition})
    },changeTextSize:function(event){
        //this.state.textSize = event.target.value;
        this.setState({textSize:event.target.value})
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <MaterialList />
                </div>
                <div className="col-sm-9 col-sm-offset-3 main">

                    composition title: <input id="title" type='text' value={this.state.composition.title}
                                              onChange={this.changeTitle}/>
                    <p></p>
                    duration(second): <input id="duration" type='text' value={this.state.composition.duration}
                                             onChange={this.changeduration}/>
                    <p></p>
                    <div className="btn-toolbar" role="toolbar" aria-label="...">

                        <div className="btn-group" role="group" aria-label="...">
                            <button type="button" className="btn btn-default" id="textbutton">text tool</button>
                            <button type="button" className="btn btn-default" id="loadJSON">loadJSON</button>
                            <button type="button" className="btn btn-default" id="outputJSON">outputJSON</button>
                            <button type="button" className="btn btn-default" id="Save">Save</button>
                            <button type="button" className="btn btn-default" id="setGrid">grid</button>

                        </div>
                    </div>
                    <p></p>
                    <p>
                        <button id="bold">Bold</button>
                        <button id="italic">Italic</button>
                        <button id="underline">Underline</button>
                        <button id="line-through">Line-through</button>
                        <input type="color" id="color"/>
                        <input type="color" id="bg-color"/>
                        <input type="number" min="5" max="150" value={this.state.textSize} id="size" width="40" onChange={this.changeTextSize}/>
                    </p>
                    <canvas id="canvas" width="720" height="480" className="canvascontext">No Canvas.</canvas>

                    <figure className="highlight" width="720" height="180">
                        <p>CompositionJSON</p>
                        <textarea id="canvasJSON" readOnly="readOnly"
                                  placeholder='{"objects":[],"background":""}'></textarea>

                    </figure>
                </div>
            </div>
        );
    }
});

module.exports = CompositionEditor;    