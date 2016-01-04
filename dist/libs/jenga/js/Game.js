//(function() {

    // Matter aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        RenderPixi = Matter.RenderPixi,
        Events = Matter.Events,
        Bounds = Matter.Bounds,
        Vector = Matter.Vector,
        Vertices = Matter.Vertices,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Query = Matter.Query;

    // MatterTools aliases
    if (window.MatterTools) {
        var Gui = MatterTools.Gui,
            Inspector = MatterTools.Inspector;
    }

    var Demo = {};

    var _engine,
        _gui,
        _inspector,
        _sceneName,
        _mouseConstraint,
        _sceneEvents = [],
        _useInspector = window.location.hash.indexOf('-inspect') !== -1,
        _isMobile = /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent);
    
    // initialise the demo

    Demo.init = function() {
        var container = document.getElementById('canvas-container');

        // some example engine options
        var options = {
            positionIterations: 6,
            velocityIterations: 4,
            enableSleeping: false
        };

        // create a Matter engine
        // NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
        _engine = Engine.create(container, options);

        // add a mouse controlled constraint
        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_engine.world, _mouseConstraint);

        // run the engine
        Engine.run(_engine);

        // default scene function name
        _sceneName = 'jenga';
        
        // get the scene function name from hash
        if (window.location.hash.length !== 0) 
            _sceneName = window.location.hash.replace('#', '').replace('-inspect', '');

        // set up a scene with bodies
        Demo[_sceneName]();

        // set up demo interface (see end of this file)
        Demo.initControls();
    };

    // call init when the page has loaded fully

    if (window.addEventListener) {
        window.addEventListener('load', Demo.init);
    } else if (window.attachEvent) {
        window.attachEvent('load', Demo.init);
    }

    
    // the functions for the demo interface and controls below

    Demo.initControls = function() {
        var demoSelect = document.getElementById('demo-select'),
            demoReset = document.getElementById('demo-reset');

        // create a Matter.Gui
        if (!_isMobile && Gui) {
            _gui = Gui.create(_engine);

            // need to add mouse constraint back in after gui clear or load is pressed
            Events.on(_gui, 'clear load', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });
        }

        // create a Matter.Inspector
        if (!_isMobile && Inspector && _useInspector) {
            _inspector = Inspector.create(_engine);

            Events.on(_inspector, 'import', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });

            Events.on(_inspector, 'play', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });

            Events.on(_inspector, 'selectStart', function() {
                _mouseConstraint.constraint.render.visible = false;
            });

            Events.on(_inspector, 'selectEnd', function() {
                _mouseConstraint.constraint.render.visible = true;
            });
        }

        // go fullscreen when using a mobile device
        if (_isMobile) {
            var body = document.body;

            body.className += ' is-mobile';
            _engine.render.canvas.addEventListener('touchstart', Demo.fullscreen);

            var fullscreenChange = function() {
                var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

                // delay fullscreen styles until fullscreen has finished changing
                setTimeout(function() {
                    if (fullscreenEnabled) {
                        body.className += ' is-fullscreen';
                    } else {
                        body.className = body.className.replace('is-fullscreen', '');
                    }
                }, 2000);
            };

            document.addEventListener('webkitfullscreenchange', fullscreenChange);
            document.addEventListener('mozfullscreenchange', fullscreenChange);
            document.addEventListener('fullscreenchange', fullscreenChange);
        }

        // initialise demo selector
      
        
        demoReset.addEventListener('click', function(e) {
            Demo[_sceneName]();
            Gui.update(_gui);
        });
    };

    Demo.fullscreen = function(){
        var _fullscreenElement = _engine.render.canvas;
        
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (_fullscreenElement.requestFullscreen) {
                _fullscreenElement.requestFullscreen();
            } else if (_fullscreenElement.mozRequestFullScreen) {
                _fullscreenElement.mozRequestFullScreen();
            } else if (_fullscreenElement.webkitRequestFullscreen) {
                _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    };
      
    Demo.reset = function() {
        var _world = _engine.world;
         _engine.enabled=true
        World.clear(_world);
        Engine.clear(_engine);

        // clear scene graph (if defined in controller)
        var renderController = _engine.render.controller;
        if (renderController.clear)
            renderController.clear(_engine.render);

        // clear all scene events
        for (var i = 0; i < _sceneEvents.length; i++)
            Events.off(_engine, _sceneEvents[i]);
        _sceneEvents = [];

        // reset id pool
        Common._nextId = 0;

        // reset mouse offset and scale (only required for Demo.views)
        Mouse.setScale(_engine.input.mouse, { x: 1, y: 1 });
        Mouse.setOffset(_engine.input.mouse, { x: 0, y: 0 });

        _engine.enableSleeping = false;
        _engine.world.gravity.y = 1;
        _engine.world.gravity.x = 0;
        _engine.timing.timeScale = 1;

        var offset = 5;
        World.add(_world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true }),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true })
        ]);

        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_world, _mouseConstraint);
        
        var renderOptions = _engine.render.options;
        renderOptions.wireframes = true;
        renderOptions.hasBounds = false;
        renderOptions.showDebug = false;
        renderOptions.showBroadphase = false;
        renderOptions.showBounds = false;
        renderOptions.showVelocity = false;
        renderOptions.showCollisions = false;
        renderOptions.showAxes = false;
        renderOptions.showPositions = false;
        renderOptions.showAngleIndicator = true;
        renderOptions.showIds = false;
        renderOptions.showShadows = false;
        renderOptions.background = '#fff';

        if (_isMobile)
            renderOptions.showDebug = true;
    };
    var stacka=[];
    Demo.jenga = function() {
        var _world = _engine.world,
           offset = 10,
            options = { 
                isStatic: true,
                render: {
                  visible: false
                }
            };
stacka=[];
        Demo.reset();
        _world.bodies = [];
 var floor=Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options)
 
        // these static walls will not be rendered in this sprites example, see options
        World.add(_world, [
           Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
            floor,
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        ]);

        var renderOptions = _engine.render.options;
     //   renderOptions.background = './img/wall-bg.jpg';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;

  _mouseConstraint.constraint.render.visible = false;
   // var jumper = Composite.get(_world, "jumper", "body");
            // an example of using mouse events on a mouse


   _sceneEvents.push(

            // an example of using collisionStart event on an engine
            Events.on(_engine, 'collisionStart', function(event) {
                var pairs = event.pairs;

                // change object colours to show those starting a collision
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                 if(pair.bodyA==floor){
                    if(pair.bodyB!=stacka[0]){
                 //   console.log(pair.bodyB)
                     for (var j= 0; j < stacka.length; j++) {
                //    stack[j].render.fillStyle = '#bbbbbb';
                }
                // _engine.enabled=false;
                 return;
               
                 }
             }
              
                }
            })


        );

    _sceneEvents.push(

        Events.on(_engine, 'mousedown', function(event) {
            var mousePosition = event.mouse.position;
           if(_engine.enabled==false){return;}    
           var mouse = event.mouse
                    engine = event.source
                   // bodies = Composite.allBodies(engine.world),
                    constraints = Composite.allConstraints(engine.world)
                    for (i = 0; i < stacka.length; i++) {
                        var body = stacka[i];

                        if (Bounds.contains(body.bounds, mouse.position) && Vertices.contains(body.vertices, mouse.position)) {
return;
            
                        }
                    }

     
            //console.log(event.mouse.button)
         var rectA = Bodies.rectangle(mousePosition.x, mousePosition.y,200, 40, {
                    
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                        //    texture: './img/box.png'
                        }
                    },friction: 0.1, restitution:0, density: 0.001,
                });
            var rectB = Bodies.rectangle(mousePosition.x+80, mousePosition.y-50,40, 40, {
                    
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                        //    texture: './img/box.png'
                        }
                    },friction: 0.1, restitution:0, density: 0.001,
                });
            var rectC = Bodies.rectangle(mousePosition.x-80, mousePosition.y-50,40, 40, {
                    
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                        //    texture: './img/box.png'
                        }
                    },friction: 0.1, restitution:0, density: 0.001,
                });
        // rect.vertices=arrow;
    var bridge = Composites.stack(150, 300, 9, 1, 10, 10, function(x, y, column, row) {
            return rectA;
        });]
    
   /* 
    var rect = Bodies.fromVertices(mousePosition.x, mousePosition.y,arrow, {
                    
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                        //    texture: './img/box.png'
                        }
                    },friction: 0.1, restitution:0, density: 0.001,
                });
     
    rect.vertices[1].x=mousePosition.x+40
    rect.vertices[3].x=mousePosition.x-40
    
    rect.vertices[0].y=rect.vertices[1].y-150
    rect.vertices[0].x=rect.vertices[1].x+150
    rect.vertices[7].x=rect.vertices[0].x-20
    rect.vertices[7].y=rect.vertices[0].y

    rect.vertices[3].y=rect.vertices[2].y-150
    rect.vertices[3].x=rect.vertices[2].x-150
    rect.vertices[4].x=rect.vertices[3].x+20
    rect.vertices[4].y=rect.vertices[3].y

rect.vertices[5].x=rect.vertices[1].x
rect.vertices[5].y=rect.vertices[1].y

rect.vertices[6].x=rect.position.x
rect.vertices[6].y=rect.position.y
*/
    scale=1;
    World.add(_world, [
        rectA,
        rectB,
        rectC,
        bridge
     //   Constraint.create({ pointA:rectA.vertices[1], bodyB:rectB}),
      //  Constraint.create({ bodyA: rectA, bodyB:rectC})
      //  Composites.car(150, 10, 10 * scale, 40 * scale, 30 * scale)
        ]);
    stacka.push(rectA);
    })

    );
         


//var renderOptions = _engine.render.options;
  //      renderOptions.showAxes = true;
    //    renderOptions.showCollisions = true;
sensitivityX=.5
sensitivityY=.5
 if (window.DeviceMotionEvent) {
window.addEventListener('devicemotion', function (e) {
    _engine.world.gravity.x = e.accelerationIncludingGravity.x * sensitivityX;
  //_engine.world.gravity.y = -e.accelerationIncludingGravity.y * sensitivity;
}, false);

      }


    };

//})();