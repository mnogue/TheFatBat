
function Spine()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.contactListener;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        this.gameObject.GetComponent(Rigidbody).body.SetAngularVelocity(10);
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        
    }
    
    // LISTENERS: ----------------------------------------------------------------------------------
    
    this.BeginContact;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN CONTACT: ----------------------------------------------------------------------------------

Spine.BeginContact = function(contact, collision)
{
    if (collision.name == "Player") collision.GetComponent(Player).SetDead();
}