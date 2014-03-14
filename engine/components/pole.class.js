
function Pole()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.rotation = 0;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        var deg2rad = 180 / Math.PI;
        this.gameObject.GetComponent(Rigidbody).body.SetAngularVelocity(this.rotation/deg2rad);
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        
    }
}