"use strict";

var React = require('react');
var Router = require('react-router');
var MaterialList=require('./MaterialList');
var _=require('lodash');

function removeCanvasObj(){
_.forEach(window._canvas._objects, function(o, key) {
window._canvas.remove(o);
});
if(window._canvas._objects.length!=0){
 removeCanvasObj();
}  
}

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
var json = '{}';
canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
    fabric.log(o, object);
});

fabric.util.requestAnimFrame(function render() {
  canvas.renderAll();
  fabric.util.requestAnimFrame(render);
});

fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function(e) {
    e.preventDefault();

});

                var grid = 15;
                // create grid
                var gridgroup = new fabric.Group([]);
                for (var i = 0; i < (720/ grid); i++) {
                  gridgroup.add(new fabric.Line([ i * grid, 0, i * grid, 480], { stroke: '#ccc', selectable: false }));
                  gridgroup.add(new fabric.Line([ 0, i * grid, 720, i * grid], { stroke: '#ccc', selectable: false }))
                }
                canvas.add(gridgroup);
                // canvas.remove(gridgroup);
 // add objects
    context.init({preventDoubleContext: true});          
                // snap to grid
                canvas.on('object:moving', function(options) { 
                  options.target.set({
                    left: Math.round(options.target.left / grid) * grid,
                    top: Math.round(options.target.top / grid) * grid
                  });   
                });

 canvas.on('object:selected', function(options) { 
  context.attach('.canvascontext', [  
    {text: 'delete',action:function(e){e.preventDefault();canvas.getActiveObject().remove();context.destroy('.canvascontext')}},
    {text: 'bringToFront',action:function(e){e.preventDefault();canvas.bringToFront(canvas.getActiveObject())}},
   {text: 'sendToBack',action:function(e){e.preventDefault();canvas.sendToBack(canvas.getActiveObject())}},
   {text: 'bringForward',action:function(e){e.preventDefault();canvas.bringForward(canvas.getActiveObject())}},
   {text: 'sendBackwards',action:function(e){e.preventDefault();canvas.sendBackwards(canvas.getActiveObject())}}
  ]);
                });

 canvas.on('object:removed', function(options) {
  console.log(options)
try {
     var el=options.target.getElement();
    } catch (e) {
        return false;
    }
 switch(el.nodeName.toUpperCase()){
case "VIDEO":
el.pause();
el.src="";
break;
}

   
  });


    $( "#canvas" ).droppable({
      drop: function( event, ui ) {
      console.log(event);   
      var el=event.toElement;
      console.log($(el).data('elObject'));
switch($(el).data('elObject').media){
case 'img':
var img = new Image();
img.src=$(el).data('elObject').path;
//var img = $(el).html();
var imgInstance = new fabric.Image(img, {
  left: event.pageX-$('#canvas').offset().left,
  top: event.pageY-$('#canvas').offset().top,
  opacity: 0.85
});
canvas.add(imgInstance);
break;
case 'video':
var vid = document.createElement('video');
vid.src = $(el).data('elObject').path;
vid.loop =true;
vid.controls = true;
var videoInstance = new fabric.Image(vid, {
  left: event.pageX-$('#canvas').offset().left,
  top: event.pageY-$('#canvas').offset().top,
  width:300,height:200,
});
canvas.add(videoInstance);
videoInstance.getElement().play();
//videoInstance.getElement()
break;

default:
break;

}
      }
    });

var canvases=[canvas];
function setStyle(object, styleName, value) {
  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
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

function addHandler(id, fn, eventName) {
  document.getElementById(id)[eventName || 'onclick'] = function() {
    var el = this;
    canvases.forEach(function(canvas, obj) {
      if (obj = canvas.getActiveObject()) {
        fn.call(el, obj);
        canvas.renderAll();
      }
    });
  };
}

addHandler('bold', function(obj) {
  var isBold = getStyle(obj, 'fontWeight') === 'bold';
  setStyle(obj, 'fontWeight', isBold ? '' : 'bold');
});

addHandler('italic', function() {
  var isItalic = getStyle(obj, 'fontStyle') === 'italic';
  setStyle(obj, 'fontStyle', isItalic ? '' : 'italic');
});

addHandler('underline', function(obj) {
  var isUnderline = (getStyle(obj, 'textDecoration') || '').indexOf('underline') > -1;
  setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
});

addHandler('line-through', function(obj) {
  var isLinethrough = (getStyle(obj, 'textDecoration') || '').indexOf('line-through') > -1;
  setStyle(obj, 'textDecoration', isLinethrough ? '' : 'line-through');
});

addHandler('color', function(obj) {
  setStyle(obj, 'fill', this.value);
}, 'onchange');

addHandler('bg-color', function(obj) {
  setStyle(obj, 'textBackgroundColor', this.value);
}, 'onchange');

addHandler('size', function(obj) {
  setStyle(obj, 'fontSize', parseInt(this.value, 10));
}, 'onchange');


$('#textbutton').click(function(event) {
  /* Act on the event */
  var iText = new fabric.IText('hello\nworld', {
  left: 50,
  top: 50,
  fontFamily: 'Helvetica',
  fill: '#fff',
  lineHeight: 1.1,
  styles: {
    0: {
      0: { textDecoration: 'underline', fontSize: 80 },
      1: { textBackgroundColor: 'red' }
    },
    1: {
      0: { textBackgroundColor: 'rgba(0,255,0,0.5)' },
      4: { fontSize: 20 }
    }
  }
});
  canvas.add(iText);
});

$('#outputJSON').click(function(event) {
  /* Act on the event */
canvas.remove(gridgroup);
var jsonString=JSON.stringify(canvas);
$('#canvasJSON').text(jsonString);
canvas.add(gridgroup);

});
$('#loadJSON').click(function(event) {

removeCanvasObj();

 var json = $('#canvasJSON').text();

 try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
    fabric.log(o, object);
    
    if(object._element==null){
      console.log(object);
var vid = document.createElement('video');
vid.src = object.src;
vid.loop =true;
vid.controls = true;
object._element=vid;
object._originalElement=vid;
object.getElement().play();
    }
});


 canvas.add(gridgroup);
});

    },
    render: function () {
        return (
              <div className="row">
                <div className="col-sm-3 sidebar">
                  <MaterialList />
                </div>
                <div className="col-sm-9 col-sm-offset-3 main">
<div className="btn-toolbar" role="toolbar" aria-label="...">
<div className="btn-group" role="group" aria-label="...">
  <button type="button" className="btn btn-default" id="textbutton">text tool</button>
  <button type="button" className="btn btn-default" id="loadJSON">loadJSON</button>
  <button type="button" className="btn btn-default" id="outputJSON">outputJSON</button>
</div>
</div>
<p>
  <button id="bold">Bold</button>
  <button id="italic">Italic</button>
  <button id="underline">Underline</button>
  <button id="line-through">Line-through</button>
  <input type="color" id="color"/>
  <input type="color" id="bg-color"/>
  <input type="text" min="5" max="150" value="40" id="size"/>
</p>
               <canvas id="canvas" width="720" height="480" className="canvascontext">No Canvas.</canvas>
               <figure className="highlight" width="720" height="180">
               <textarea id="canvasJSON"></textarea>

               </figure>
                </div>
            </div>
        );
    }
});

module.exports = CompositionEditor;    