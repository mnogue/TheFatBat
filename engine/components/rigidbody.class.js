
function Rigidbody()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.body;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        
    }
    
    // PHYSICS CREATION: ---------------------------------------------------------------------------
    
    this.CreateStaticBox = function(x, y, width, height, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateStaticBox(x, y, width, height, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateStaticBox(x, y, width, height, angle, this.gameObject);
        }
    }
    
    this.CreateKinematicBox = function(x, y, width, height, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateKinematicBox(x, y, width, height, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateKinematicBox(x, y, width, height, angle, this.gameObject);
        }
    }
    
    this.CreateDynamicBox = function(x, y, width, height, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateDynamicBox(x, y, width, height, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateDynamicBox(x, y, width, height, angle, this.gameObject);
        }
    }
    
    this.CreateStaticCircle = function(x, y, radius, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateStaticCircle(x, y, radius, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateStaticCircle(x, y, radius, angle, this.gameObject);
        }
    }
    
    this.CreateKinematicCircle = function(x, y, radius, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateKinematicCircle(x, y, radius, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateKinematicCircle(x, y, radius, angle, this.gameObject);
        }
    }
    
    this.CreateDynamicCircle = function(x, y, radius, angle, density, friction, restitution)
    {
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            var objFix = _engine.scene.CreateFixture(density, friction, restitution);
            this.body = _engine.scene.CreateDynamicCircle(x, y, radius, angle, this.gameObject, objFix);
        }
        else
        {
            this.body = _engine.scene.CreateDynamicCircle(x, y, radius, angle, this.gameObject);
        }
    }
    
    // SENSORS: ------------------------------------------------------------------------------------
    
    this.CreateSensorBox = function(x, y, width, height, angle)
    {
        var objFix;
        
        if (typeof density !== 'undefined' && 
            typeof friction !== 'undefined' && 
            typeof restitution !== 'undefined')
        {
            objFix = _engine.scene.CreateFixture(density, friction, restitution);
            objFix.isSensor = true;
            this.body = _engine.scene.CreateStaticBox(x, y, width, height, angle, this.gameObject, objFix);
        }
        else
        {
            objFix = _engine.scene.CreateFixture();
            objFix.isSensor = true;
            this.body = _engine.scene.CreateStaticBox(x, y, width, height, angle, this.gameObject, objFix);
        }
    }
}
