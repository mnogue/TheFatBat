
function Gear()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    
    this.rotation = 0;
    this.originx  = 0;
    this.originy  = 0;
    this.targetx  = 0;
    this.targety  = 0;
    
    this.forwardTranslation = true;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        var deg2rad = 180 / Math.PI;
        this.gameObject.GetComponent(Rigidbody).body.SetAngularVelocity(this.rotation/deg2rad);
        
        var gearPosition = new Box2D.Common.Math.b2Vec2(0,0);
        gearPosition.x = (this.gameObject.GetComponent(Rigidbody).body.GetPosition().x * Scene.SCALE) * 2;
        gearPosition.y = this.gameObject.GetComponent(Rigidbody).body.GetPosition().y * Scene.SCALE;
        
        var direction = new Box2D.Common.Math.b2Vec2(0,0);
        var gearDirection = new Box2D.Common.Math.b2Vec2(0,0);
        var distance;
        
        if (this.forwardTranslation)
        {
            direction.x = this.targetx - this.originx;
            direction.y = this.targety - this.originy;
            direction.Normalize();
            
            gearDirection.x = gearPosition.x - this.targetx;
            gearDirection.y = gearPosition.y - this.targety;
            distance = Math.sqrt(Math.pow(gearDirection.x, 2) + Math.pow(gearDirection.y, 2));
            if (distance < 20.0) this.forwardTranslation = false;
        }
        else
        {
            direction.x = this.originx - this.targetx;
            direction.y = this.originy - this.targety;
            direction.Normalize();
            
            gearDirection.x = gearPosition.x - this.originx;
            gearDirection.y = gearPosition.y - this.originy;
            distance = Math.sqrt(Math.pow(gearDirection.x, 2) + Math.pow(gearDirection.y, 2));
            if (distance < 10.0) this.forwardTranslation = true;
        }
        
        direction.x = direction.x * this.speed;
        direction.y = direction.y * this.speed;
        this.gameObject.GetComponent(Rigidbody).body.SetLinearVelocity(direction);
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

Gear.BeginContact = function(contact, collision)
{
    if (collision.name == "Player") collision.GetComponent(Player).SetDead();
}