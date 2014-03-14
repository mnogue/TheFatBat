
function Star()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.active = true;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        
    }
    
    // DESTROY FUNCTION: ---------------------------------------------------------------------------
    
    this.Destroy = function()
    {
        this.active = false;
        this.gameObject.GetComponent(Renderer).ChangeAnimation(1);
    }
    
    // LISTENERS: ----------------------------------------------------------------------------------
    
    this.BeginContact;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN CONTACT: ----------------------------------------------------------------------------------

Star.BeginContact = function(contact, starCollider, objectCollider)
{
    if (starCollider.name == "Star" && objectCollider.name == "Player")
    {
        if (starCollider.GetComponent(Star).active)
        {
            objectCollider.GetComponent(Player).AddStar();
            starCollider.GetComponent(Star).Destroy();
        }
    }
}