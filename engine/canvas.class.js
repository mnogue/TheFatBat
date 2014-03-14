
function Canvas()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.active = true;
    
    this.elementID = "view";
    this.canvas;
    
    this.backgroundID = "background";
    
    // START: --------------------------------------------------------------------------------------
    
    this.Start = function()
    {
        this.canvas = document.getElementById(this.elementID).getContext('2d');
    }
    
    // PAINT: --------------------------------------------------------------------------------------
    
    this.Paint = function()
    {
        if (typeof _engine.scene === 'undefined' || _engine.scene == null) return;
        
        this.Clean();
        var nextBody = _engine.scene.world.GetBodyList();
        
        while (nextBody)
        {
            var body = nextBody;
            nextBody = body.GetNext();
            
            var bodyData = body.GetUserData();
            
            if (bodyData instanceof GameObject && bodyData.HasComponent(Renderer)) 
            {
                var sprite = bodyData.GetComponent(Renderer).GetSprite();
                var positionX = body.GetPosition().x * Scene.SCALE;
                var positionY = body.GetPosition().y * Scene.SCALE;
                if (bodyData.name == "Gear") console.log(positionX+" "+positionY)
                var angle     = body.GetAngle();
                this.canvas.translate(positionX, positionY);
                this.canvas.rotate(angle)
                this.canvas.drawImage(sprite, -sprite.width/2, -sprite.height/2);
                this.canvas.rotate(-angle);
                this.canvas.translate(-positionX, -positionY);
            }
        }
    }
    
    // CLEAN CANVAS: -------------------------------------------------------------------------------
    
    this.Clean = function()
    {
        if (!Debugger.DEBUG_ACTIVE)
        {
            var w = _settings.width;
            var h = _settings.height;
            this.canvas.clearRect(0, 0, w, h);
        }
    }
}