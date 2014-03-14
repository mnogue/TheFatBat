
function GameObject()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.active = true;
    this.name = "no-name";
    this.toDestroy = false;
    this.components = new Array();
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function(body)
    {
        if (this.HasComponent(Rigidbody)) this.GetComponent(Rigidbody).body = body;
        
        for (var i in this.components)
        {
            if (typeof this.components[i].Update === 'function') this.components[i].Update();
        }
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        for (var i in this.components)
        {
            if (typeof this.components[i].Start === 'function') this.components[i].Start();
        }
    }
    
    // GETTERS: ------------------------------------------------------------------------------------
    
    this.HasComponent = function(componentType)
    {
        for (var i = 0; i < this.components.length; ++i)
        {
            if (this.components[i] instanceof componentType) return true;
        }
        
        return false;
    }
    
    this.GetComponent = function(componentType)
    {
        for (var i = 0; i < this.components.length; ++i)
        {
            if (this.components[i] instanceof componentType) return this.components[i];
        }
        
        return false;
    }
    
    // SETTERS: ------------------------------------------------------------------------------------
    
    this.AddComponent = function(component)
    {
        this.components.push(component);
    }
}