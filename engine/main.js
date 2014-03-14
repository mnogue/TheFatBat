
// GLOBAL VARIABLES: -------------------------------------------------------------------------------

var _settings;
var _engine;
var _canvas;
var _input;

/** debugger **/
var _console1;
var _console2;
var _console3;
var _console4;

// UPDATE FUNCTION: --------------------------------------------------------------------------------

function Update()
{
    _input.Update();
    _engine.Update();
    _canvas.Paint();
    
    requestAnimFrame(Update);
}

// START FUNCTION: ---------------------------------------------------------------------------------

function Start()
{
    // init settings:
    _settings = new Settings(); _settings.Start();
    
    // init debugger:
    if (Debugger.DEBUG_ACTIVE) $("div.debugger").show();
    _console1 = new Debugger(); _console1.Init("div#console1");
    _console2 = new Debugger(); _console2.Init("div#console2");
    _console3 = new Debugger(); _console3.Init("div#console3");
    _console4 = new Debugger(); _console4.Init("div#console4");
    
    _canvas = new Canvas();
    _engine = new Engine();
    _input  = new Input();
    
    _canvas.Start();
    _engine.Start();
    _input.Start();
    
    // start main loop:
    requestAnimFrame(Update);
}

// TIME UPDATE: ------------------------------------------------------------------------------------

window.requestAnimFrame = (function()
{
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(function()
        {
            callback(+new Date);
        }, 1000 / 60);
    };
})();

$(window).load( function() { Start(); });
