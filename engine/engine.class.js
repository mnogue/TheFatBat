
function Engine()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.menu;
    this.scene;
    this.levels;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        if (typeof this.scene !== 'undefined' && 
            this.scene != null &&
            this.scene.sceneLoaded) 
        {
            this.scene.Update();
        }
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        this.levels = new Array();
        this.levels[0] = "001"; this.levels[5] = "006"; this.levels[10] = "011";
        this.levels[1] = "002"; this.levels[6] = "007"; this.levels[11] = "012";
        this.levels[2] = "003"; this.levels[7] = "008"; this.levels[12] = "013";
        this.levels[3] = "004"; this.levels[8] = "009"; this.levels[13] = "014";
        this.levels[4] = "005"; this.levels[9] = "010"; this.levels[14] = "015";
        
        this.menu = new Menu();
        this.menu.Start();
    }
    
    // RELOAD: -------------------------------------------------------------------------------------
    
    this.LoadLevel = function(level)
    {
        this.scene = new Scene();
        this.scene.Start(level);
    }
}