"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var CompositionEditor = React.createClass({
    componentDidMount: function () {
     
    fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'rgba(102,153,255,0.5)',
    cornerSize: 12,
    padding: 5
});

// initialize fabric canvas and assign to global windows object for debug
var canvas = window._canvas = new fabric.Canvas('canvas');
canvas.selectionColor = 'rgba(0,255,0,0.3)';
var json = '{}'
canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
    fabric.log(o, object);
});

                var grid = 60;
                // create grid
                for (var i = 0; i < (720/ grid); i++) {
                  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 480], { stroke: '#ccc', selectable: false }));
                  canvas.add(new fabric.Line([ 0, i * grid, 720, i * grid], { stroke: '#ccc', selectable: false }))
                }
 // add objects
                var rect = new fabric.Rect({ 
                  left: 100, 
                  top: 100, 
                  width: 50, 
                  height: 50, 
                  fill: '#faa', 
                  originX: 'left', 
                  originY: 'top',
                  scaleY: 0.5,
                  centeredRotation: true
                });

                var circle = new fabric.Circle({ 
                  left: 300, 
                  top: 300, 
                  radius: 50, 
                  fill: '#9f9', 
                  originX: 'left', 
                  originY: 'top',
                  centeredRotation: true
                });       

                var rectGroup = new fabric.Group([rect, circle], {
                                    width: 300,
                                    height: 300,
                                    left: 100,
                                    top: 100,
                                    angle: 0
                                });
                canvas.add(rectGroup);
                // snap to grid
                canvas.on('object:moving', function(options) { 
                  options.target.set({
                    left: Math.round(options.target.left / grid) * grid,
                    top: Math.round(options.target.top / grid) * grid
                  });
                });
                canvas.setActiveObject(circle);
                canvas.renderAll();


    },
    render: function () {
        return (
              <div className="row">
                <div className="col-sm-3 sidebar">
                  
                </div>
                <div className="col-sm-9 col-sm-offset-3 main">
             <p></p>
                <p></p>
                   <p></p>
                      <p></p>
                         <p></p>
                            <p></p>
               <canvas id="canvas" width="720" height="480">No Canvas.</canvas>
               
                </div>
            </div>
        );
    }
});

module.exports = CompositionEditor;    