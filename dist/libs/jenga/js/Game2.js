

    // Matter aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        Events = Matter.Events,
        Bounds = Matter.Bounds,
        Vector = Matter.Vector,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Query = Matter.Query;
        isSelect=false;
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
        _sceneName = 'sprites';
        
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

 
     Demo.sprites = function() {
        var _world = _engine.world,
            offset = 10,
            options = { 
                isStatic: true,
                render: {
                    visible: false
                }
            };

        Demo.reset();
        _world.bodies = [];

        // these static walls will not be rendered in this sprites example, see options
        World.add(_world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        ]);

        var renderOptions = _engine.render.options;
     //   renderOptions.background = './img/wall-bg.jpg';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;

  _mouseConstraint.constraint.render.visible = false;
 
     
     


   // var jumper = Composite.get(_world, "jumper", "body");
    _sceneEvents.push(

            // an example of using mouse events on a mouse
            Events.on(_world, 'startdrag', function(event) {
                console.log('startdrag', event);
            })

        );

        _sceneEvents.push(

           
            Events.on(_world, 'enddrag', function(event) {
                console.log('enddrag', event);
            })

        );
    _sceneEvents.push(

        Events.on(_engine, 'mousedown', function(event) {
            var mousePosition = event.mouse.position;
            console.log(event.mouse.button)
          var rect = Bodies.rectangle(mousePosition.x, mousePosition.y, 164, 64, {
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                        //    texture: './img/box.png'
                        }
                    }
                });
    World.add(_world, rect);
    })

    );


    };


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
  //      demoSelect.value = _sceneName;
        
       
        
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
        
        World.clear(_world);
        Engine.clear(_engine);

        // clear scene graph (if defined in controller)
        var renderController = _engine.render.controller;
        if (renderController.clear)
            renderController.clear(_engine.render);

        // clear all scene events
        for (var i = 0; i < _sceneEvents.length; i++)
            Events.off(_engine, _sceneEvents[i]);

        if (_mouseConstraint.events) {
            for (i = 0; i < _sceneEvents.length; i++)
                Events.off(_mouseConstraint, _sceneEvents[i]);
        }

        if (_world.events) {
            for (i = 0; i < _sceneEvents.length; i++)
                Events.off(_world, _sceneEvents[i]);
        }

        _sceneEvents = [];

        // reset id pool
        Common._nextId = 0;

        // reset random seed
        Common._seed = 0;

        // reset mouse offset and scale (only required for Demo.views)
        Mouse.setScale(_mouseConstraint.mouse, { x: 1, y: 1 });
        Mouse.setOffset(_mouseConstraint.mouse, { x: 0, y: 0 });

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
  


