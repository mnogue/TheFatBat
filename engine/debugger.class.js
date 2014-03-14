
function Debugger()
{
    // STATIC VARIABLES: ---------------------------------------------------------------------------
    
    this.DEBUG_ACTIVE;
    
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.element = "";
    
    // INIT FUNCTION: ------------------------------------------------------------------------------
    
    this.Init = function(elem)
    {
        this.element = elem;
    }
    
    // PRINT: --------------------------------------------------------------------------------------
    
    this.Print = function(msg)
    {
        if (Debugger.DEBUG_ACTIVE) $(this.element).append("<br>"+msg);
    }
    
    this.Put = function(msg)
    {
        if (Debugger.DEBUG_ACTIVE) $(this.element).html(msg);
    }
    
    this.Clean = function()
    {
        if (Debugger.DEBUG_ACTIVE) $(this.element).html("");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT STATIC VARIABLES: --------------------------------------------------------------------------

Debugger.DEBUG_ACTIVE = false;