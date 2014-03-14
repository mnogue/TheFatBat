
function Input()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.cursorX = 0;
    this.cursorY = 0;
    
    this.keyUp    = false;
    this.keyDown  = false;
    this.keyLeft  = false;
    this.keyRight = false;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        var string = "";
        string += "Mouse X: "+this.cursorX+"<br>";
        string += "Mouse Y: "+this.cursorY+"<br>";
        string += "UP: "+this.keyUp+" "+" DOWN: "+this.keyDown+"<br>";
        string += "LEFT: "+this.keyLeft+" RIGHT: "+this.keyRight;
        _console2.Put(string);
        
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        document.getElementById(_canvas.elementID).addEventListener("mousemove", _input.MouseMove);
        document.getElementById(_canvas.elementID).addEventListener("click", _input.MouseClick);
        document.addEventListener("keydown", _input.KeyboardDown);
        document.addEventListener("keyup", _input.KeyboardUp);
        document.getElementById(_canvas.elementID).addEventListener("touchstart", _input.TouchDown);
        document.getElementById(_canvas.elementID).addEventListener("touchend", _input.TouchUp);
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // EVENT LISTENERS: mouse move -----------------------------------------------------------------
    
    this.MouseMove = function(e)
    {
        _input.cursorX = (e.pageX - $("canvas#"+_canvas.elementID).position().left) / _settings.width;
        _input.cursorY = (e.pageY - $("canvas#"+_canvas.elementID).position().top)  / _settings.height;
    }
    
    // EVENT LISTENERS: mouse click ----------------------------------------------------------------
    
    this.MouseClick = function(e)
    {
        switch (e.button)
        {
            case 0 : break; // left
            case 1 : break; // middle
            case 2 : break; // right
        }
    }
    
    // EVENT LISTENERS: touch ----------------------------------------------------------------------
    
    this.TouchDown = function(e)
    {
        _input.keyUp = true;
        
        _console3.Put(Player.PLAYER_X * Scene.SCALE +" "+ e.pageX);
        
        if (Player.PLAYER_X * Scene.SCALE > e.pageX &&
            Player.PLAYER_X * Scene.SCALE - e.pageX > 100)
        {
            _input.keyLeft  = true;
            _input.keyRight = false;
        }
        else if (Player.PLAYER_X * Scene.SCALE < e.pageX &&
            Player.PLAYER_X * Scene.SCALE - e.pageX < -100)
        {
            _input.keyLeft  = false;
            _input.keyRight = true;
        }
        else
        {
            _input.keyLeft  = false;
            _input.keyRight = false;
        }
    }
    
    this.TouchUp = function(e)
    {
        _input.keyLeft  = false;
        _input.keyUp    = false;
        _input.keyRight = false;
    }
    
    // EVENT LISTENERS: keyboard press -------------------------------------------------------------
    
    this.KeyboardDown = function(e)
    {
        var keycode = e.keyCode || e.which;
        
        switch (keycode)
        {
            case 37 : _input.keyLeft  = true; break; /* Arrow Left  */
            case 38 : _input.keyUp    = true; break; /* Arrow Up    */
            case 39 : _input.keyRight = true; break; /* Arrow Right */
            case 65 : _input.keyLeft  = true; break; /* A */
            case 87 : _input.keyUp    = true; break; /* W */
            case 68 : _input.keyRight = true; break; /* D */
            case 32 : _input.keyUp    = true; break; /* Space */
        }
    }
    
    // EVENT LISTENERS: keyboard release -----------------------------------------------------------
    
    this.KeyboardUp = function(e)
    {
        var keycode = e.keyCode || e.which;
        
        switch (keycode)
        {
            case 37 : _input.keyLeft  = false; break; /* Arrow Left  */
            case 38 : _input.keyUp    = false; break; /* Arrow Up    */
            case 39 : _input.keyRight = false; break; /* Arrow Right */
            case 65 : _input.keyLeft  = false; break; /* A */
            case 87 : _input.keyUp    = false; break; /* W */
            case 68 : _input.keyRight = false; break; /* D */
            case 32 : _input.keyUp    = false; break; /* Space */
        }
    }
}