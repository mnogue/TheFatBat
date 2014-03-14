
function ContactListeners()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = this.BeginContact;
        _engine.scene.world.SetContactListener(contactListener);
    }
    
    // BEGIN CONTACT: ------------------------------------------------------------------------------
    
    this.BeginContact = function(contact)
    {
        var bodyDataA = contact.GetFixtureA().GetBody().GetUserData();
        var bodyDataB = contact.GetFixtureB().GetBody().GetUserData();
        
        if (!(bodyDataA instanceof GameObject)) return;
        if (!(bodyDataB instanceof GameObject)) return;
        
        ContactListeners.ResolveBeginContact(bodyDataA, bodyDataB, contact);
        ContactListeners.ResolveBeginContact(bodyDataB, bodyDataA, contact);
    }
    
    // CONTACT RESOLVERS: --------------------------------------------------------------------------
    
    this.ResolveBeginContact;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// RESOLVE BEGIN CONTACT: --------------------------------------------------------------------------

ContactListeners.ResolveBeginContact = function(dataA, dataB, contact)
{
    switch (dataA.name)
    {
        case "Spine" : Spine.BeginContact(contact, dataB); break;
        case "Gear"  : Gear.BeginContact(contact, dataB);  break;
        case "Goal"  : Goal.BeginContact(contact,  dataB); break;
        case "Star"  : Star.BeginContact(contact,  dataA, dataB); break;
    }
}