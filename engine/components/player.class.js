
function Player()
{
    // ENUMS: --------------------------------------------------------------------------------------
    
    function E__STATE()
    {
        this.IDLE = 0;
        this.DROP = 1;
        this.PLAY = 2;
        this.DEAD = 3;
        this.VICT = 4;
    }
    
    this.STATE;
    
    // GLOBAL VARIABLES: ---------------------------------------------------------------------------
    
    this.ACTIVE;
    this.DROPTIME;
    this.PLAYER_X;
    this.PLAYER_Y;
    
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.speedX = 20;
    this.speedY = 50;
    
    this.state = 0;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        switch (this.state)
        {
            case this.STATE.IDLE : this.PlayerIdleUpdate(); break;
            case this.STATE.DROP : this.PlayerDropUpdate(); break;
            case this.STATE.PLAY : this.PlayerPlayUpdate(); break;
            case this.STATE.DEAD : this.PlayerDeadUpdate(); break;
            case this.STATE.VICT : this.PlayerVictUpdate(); break;
        }
        
        Player.PLAYER_X = this.gameObject.GetComponent(Rigidbody).body.GetPosition().x;
        Player.PLAYER_Y = this.gameObject.GetComponent(Rigidbody).body.GetPosition().y;
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        this.STATE = new E__STATE();
        this.state = this.STATE.IDLE;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // PLAYER UPDATES: -----------------------------------------------------------------------------
    
    this.PlayerIdleUpdate = function()
    {
        var wakeUp = false;
        if (_input.keyUp)    wakeUp = true;
        if (_input.keyDown)  wakeUp = true;
        if (_input.keyLeft)  wakeUp = true;
        if (_input.keyRight) wakeUp = true;
        
        if (wakeUp)
        {
            
            this.gameObject.GetComponent(Rigidbody).body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
            this.gameObject.GetComponent(Rigidbody).body.SetAwake(true);
            setTimeout('Player.EnableGameplay()', Player.DROPTIME);
            this.gameObject.GetComponent(Renderer).ChangeAnimation(1);
            this.state = this.STATE.DROP;
        }
    }
    
    this.PlayerDropUpdate = function()
    {
        if (Player.ACTIVE) 
        {
            Player.ACTIVE = false;
            this.state = this.STATE.PLAY;
            this.gameObject.GetComponent(Renderer).ChangeAnimation(2);
        }
    }
    
    this.PlayerPlayUpdate = function()
    {
        var deg2Rad = (180 / Math.PI);
        
        /** INPUT FORCE: **/
        
        var direction = new Box2D.Common.Math.b2Vec2(0, 0);
        if (_input.keyUp)    direction.y -= 1;
        if (_input.keyDown)  direction.y += 1;
        if (_input.keyLeft)  direction.x -= 1;
        if (_input.keyRight) direction.x += 1;
        
        direction.Normalize();
        direction.x = direction.x * this.speedX;
        direction.y = direction.y * this.speedY;
        
        var center = this.gameObject.GetComponent(Rigidbody).body.GetWorldCenter();
        
        if (direction.x != 0 || direction.y != 0)
        {
            this.gameObject.GetComponent(Rigidbody).body.ApplyForce(direction, center);
        }
        
        /** TORQUE FORCE TO STABILIZE: **/
        
        var bodyAngle = this.gameObject.GetComponent(Rigidbody).body.GetAngle();
        if (bodyAngle > 0.02 || bodyAngle < -0.02)
        {
            var nextAngle = bodyAngle + this.gameObject.GetComponent(Rigidbody).body.GetAngularVelocity() / deg2Rad;
            var totalRotation = -nextAngle;
            while (totalRotation < -180 * deg2Rad) totalRotation += 360 * deg2Rad;
            while (totalRotation >  180 * deg2Rad) totalRotation -= 360 * deg2Rad;
            var desiredAngularVelocity = totalRotation * deg2Rad;
            var torque = this.gameObject.GetComponent(Rigidbody).body.GetInertia() * desiredAngularVelocity * 0.8;
            this.gameObject.GetComponent(Rigidbody).body.ApplyTorque(torque);
        }
    }
    
    this.PlayerDeadUpdate = function()
    {
        
    }
    
    this.PlayerVictUpdate = function()
    {
        
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // SETTERS: ------------------------------------------------------------------------------------
    
    this.SetDead = function() 
    {
        if (this.state == this.STATE.PLAY)
        {
            this.state = this.STATE.DEAD;
            _engine.menu.HideGameUI();
            setTimeout('_engine.menu.Replay()', 3000);
            this.gameObject.GetComponent(Renderer).ChangeAnimation(3);
        }
    }
    
    this.SetVictory = function() 
    {
        if (this.state == this.STATE.PLAY)
        {
            this.gameObject.GetComponent(Rigidbody).body.SetType(Box2D.Dynamics.b2Body.b2_staticBody);
            this.state = this.STATE.VICT;
            _engine.menu.HideGameUI();
            setTimeout("_engine.menu.VictoryMenu()", 1700);
        }
    }
    
    this.AddStar = function()
    {
        if (this.state == this.STATE.PLAY)
        {
            _engine.scene.stars += 1;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// STATIC VARIABLES: -------------------------------------------------------------------------------

Player.ACTIVE   = false;
Player.DROPTIME = 500;
Player.PLAYER_X = -1;
Player.PLAYER_Y = -1;

////////////////////////////////////////////////////////////////////////////////////////////////////
// STATIC FUNCTIONS: -------------------------------------------------------------------------------

Player.EnableGameplay = function()
{
    Player.ACTIVE = true;
}
