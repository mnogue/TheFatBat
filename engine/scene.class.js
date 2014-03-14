
function Scene()
{
    // STATIC VARIABLES: ---------------------------------------------------------------------------
    
    this.SCALE;
    
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.levelID;
    this.world;
    this.sceneLoaded = false;
    
    this.stars = 0;
    
    this.sceneWidth;  /* set at settings.class.js. DO NOT MODIFY HERE! */
    this.sceneHeight; /* set at settings.class.js. DO NOT MODIFY HERE! */
    
    this.contactListeners;
    
    // UPDATE: -------------------------------------------------------------------------------------
    
    this.Update = function()
    {
        this.world.Step(1/60, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();
        
        var nextBody = this.world.GetBodyList();
        while (nextBody)
        {
            var body = nextBody;
            nextBody = body.GetNext();
            
            var bodyData = body.GetUserData();
            
            if (bodyData instanceof GameObject) 
            {
                if (bodyData.toDestroy) this.world.DestroyBody(body);
                else bodyData.Update(body);
            }
        }
        
        _console4.Put("STARS = "+this.stars);
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function(levelID)
    {
        this.sceneLoaded = false;
        this.levelID = levelID;
        this.sceneWidth  = _settings.width;
        this.sceneHeight = _settings.height;
        
        document.getElementById(_canvas.elementID).width  = this.sceneWidth;
        document.getElementById(_canvas.elementID).height = this.sceneHeight;
        $('canvas#'+_canvas.elementID).width(this.sceneWidth);
        $('canvas#'+_canvas.elementID).height(this.sceneHeight);
        $('div#'+_canvas.backgroundID).width(this.sceneWidth);
        $('div#'+_canvas.backgroundID).height(this.sceneHeight);
        
        this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10),  true);
        
        // create world limits:
        var t = 30; /* thickness */
        this.CreateWorldLimit(this.sceneWidth, this.sceneHeight+(t/2), this.sceneWidth, t);    /* bottom */
        this.CreateWorldLimit(this.sceneWidth, -(t/2), this.sceneWidth, t);                    /* top    */
        this.CreateWorldLimit(-(t), this.sceneHeight/2, t, this.sceneHeight);                  /* left   */
        this.CreateWorldLimit((this.sceneWidth*2)+t, this.sceneHeight/2, t, this.sceneHeight); /* right  */
        
        $.getJSON('data/LEVEL'+this.levelID+'.json', function(data) 
        {
            for (var i in data.objects)
            {
                var wo = data.objects[i];
                switch (wo.name)
                {
                    case "Player" : _engine.scene.CreatePlayer(wo.x, wo.y);                             break;
                    case "Cobweb" : _engine.scene.CreateCobweb(wo.x, wo.y, wo.a);                       break;
                    case "Pole"   : _engine.scene.CreatePole(wo.x, wo.y, wo.a, wo.r);                   break;
                    case "Spine"  : _engine.scene.CreateSpine(wo.x, wo.y, wo.a);                        break;
                    case "Gear"   : _engine.scene.CreateGear(wo.x, wo.y, wo.a, wo.r, wo.u, wo.v, wo.s); break;
                    case "Star"   : _engine.scene.CreateStar(wo.x, wo.y, wo.a);                         break;
                    case "Goal"   : _engine.scene.CreateGoal(wo.x, wo.y, wo.a);                         break;
                }
            }
        });
        
        this.contactListeners = new ContactListeners();
        this.contactListeners.Start();
        
        if (Debugger.DEBUG_ACTIVE)
        {
            var debugDraw = new Box2D.Dynamics.b2DebugDraw();
            debugDraw.SetSprite(_canvas.canvas);
            debugDraw.SetDrawScale(Scene.SCALE);
            debugDraw.SetFillAlpha(0.2);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
            this.world.SetDebugDraw(debugDraw);
        }
        
        this.sceneLoaded = true;
        _engine.menu.OpenSliders();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // GAME OBJECTS CREATORS: ----------------------------------------------------------------------
    
    this.CreatePlayer = function(x,y)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var player     = new Player();
        var render     = new Renderer();
        
        gameObject.name = "Player";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateStaticCircle(x, y, 35, 0);
        player.gameObject = gameObject;
        render.gameObject = gameObject;
        render.BeforeStart();
        
        /* ANIMATIONS
         * 0: idle
         * 1: drop
         * 2: fly
         * 3: dead
         * 4: vict
        **/
        
        render.SetSprite(0,  0, "resources/bat/idle/idle1.png"); 
        render.SetSprite(0,  1, "resources/bat/idle/idle1.png"); 
        render.SetSprite(0,  2, "resources/bat/idle/idle1.png"); 
        render.SetSprite(0,  3, "resources/bat/idle/idle1.png"); 
        render.SetSprite(0,  4, "resources/bat/idle/idle1.png"); 
        render.SetSprite(0,  5, "resources/bat/idle/idle2.png"); 
        render.SetSprite(0,  6, "resources/bat/idle/idle3.png"); 
        render.SetSprite(0,  7, "resources/bat/idle/idle3.png"); 
        render.SetSprite(0,  8, "resources/bat/idle/idle3.png"); 
        render.SetSprite(0,  9, "resources/bat/idle/idle3.png"); 
        render.SetSprite(0, 10, "resources/bat/idle/idle3.png");
        render.SetSprite(0, 11, "resources/bat/idle/idle2.png");
        render.SetSprite(1, 0, "resources/bat/drop/drop1.png");
        render.SetSprite(1, 1, "resources/bat/drop/drop2.png");
        render.SetSprite(1, 2, "resources/bat/drop/drop3.png");
        render.SetSprite(1, 3, "resources/bat/drop/drop4.png");
        render.SetSprite(1, 4, "resources/bat/drop/drop5.png");
        render.SetSprite(1, 5, "resources/bat/drop/drop5.png");
        render.SetSprite(1, 6, "resources/bat/drop/drop5.png");
        render.SetSprite(1, 7, "resources/bat/drop/drop5.png");
        render.SetSprite(1, 8, "resources/bat/drop/drop5.png");
        render.SetSprite(1, 9, "resources/bat/drop/drop5.png");
        render.SetSprite(2, 0, "resources/bat/fly/fly1.png");
        render.SetSprite(2, 1, "resources/bat/fly/fly2.png");
        render.SetSprite(2, 2, "resources/bat/fly/fly3.png");
        render.SetSprite(2, 3, "resources/bat/fly/fly2.png");
        render.SetSprite(3, 0, "resources/bat/dead/dead.png");
        render.SetSprite(4, 0, "resources/bat/fly/fly1.png");
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(player);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateCobweb = function(x,y, angle)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var cobweb = new Cobweb();
        
        gameObject.name = "Cobweb";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateStaticBox(x, y, 150, 10, angle, 1.0, 0.2, 1.0);
        cobweb.gameObject = gameObject;
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(cobweb);
        gameObject.Start();
    }
    
    this.CreatePole = function(x,y, angle, rotation)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var pole = new Pole();
        var render = new Renderer();
        
        gameObject.name = "Pole";
        rigidbody.gameObject = gameObject;
        if (rotation == 0) rigidbody.CreateStaticBox(x, y, 200, 10, angle);
        else rigidbody.CreateKinematicBox(x, y, 200, 10, angle);
        pole.gameObject = gameObject;
        pole.rotation = rotation;
        render.gameObject = gameObject;
        render.BeforeStart();
        render.SetSprite(0, 0, "resources/pole/pole.png");
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(pole);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateSpine = function(x,y, angle)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var spine      = new Spine();
        var render     = new Renderer();
        
        gameObject.name = "Spine";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateStaticBox(x, y, 150, 20, angle, 1.0, 0.8, 0.5);
        spine.gameObject = gameObject;
        render.gameObject = gameObject;
        render.BeforeStart();
        render.SetSprite(0, 0, "resources/spine/spine.png"); 
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(spine);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateGear = function(x, y, angle, rotation, targetx, targety, speed)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var gear       = new Gear();
        var render     = new Renderer();
        
        gameObject.name = "Gear";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateKinematicCircle(x, y, 100, angle, 1.0, 0.8, 1.0);
        gear.gameObject = gameObject;
        gear.originx  = x; 
        gear.originy  = y;
        gear.rotation = rotation;
        gear.targetx  = targetx;
        gear.targety  = targety;
        gear.speed    = speed;
        render.gameObject = gameObject;
        render.BeforeStart();
        render.SetSprite(0, 0, "resources/gear/gear.png"); 
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(gear);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateStar = function(x, y, angle)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var star = new Star();
        var render = new Renderer();
        
        gameObject.name = "Star";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateSensorBox(x, y, 40, 40, angle);
        star.gameObject = gameObject;
        render.gameObject = gameObject;
        render.BeforeStart();
        render.SetSprite(0, 0, "resources/star/star.png");
        render.SetSprite(1, 0, "resources/star/nothing.png");
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(star);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateGoal = function(x,y, angle)
    {
        var gameObject = new GameObject();
        var rigidbody  = new Rigidbody();
        var goal = new Goal();
        var render = new Renderer();
        
        gameObject.name = "Goal";
        rigidbody.gameObject = gameObject;
        rigidbody.CreateSensorBox(x, y, 10, 10, angle);
        goal.gameObject = gameObject;
        render.gameObject = gameObject;
        render.BeforeStart();
        render.SetSprite(0, 0, "resources/goal/goal.png");
        
        gameObject.AddComponent(rigidbody);
        gameObject.AddComponent(goal);
        gameObject.AddComponent(render);
        gameObject.Start();
    }
    
    this.CreateWorldLimit = function(x,y,w,h)
    {
        var fixture = this.CreateFixture(1.0, 0.3, 0.0);
        this.CreateStaticBox(x,y,w,h, 0, null, fixture);
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // PHYSICS CREATORS: ---------------------------------------------------------------------------
    
    this.CreateFixture = function(density, friction, restitution)
    {
        var objFix = new Box2D.Dynamics.b2FixtureDef;
        objFix.density = 1.0;
        objFix.friction = 0.5;
        objFix.restitution = 0.2;
        
        if (arguments.length == 3)
        {
            objFix.density = density;
            objFix.friction = friction;
            objFix.restitution = restitution;
        }
        
        return objFix;
    }
    
    this.CreateStaticBox = function(x, y, width, height, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 7) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_staticBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        objFix.shape.SetAsBox((width/Scene.SCALE)/2, (height/Scene.SCALE)/2);
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
    
    this.CreateKinematicBox = function(x, y, width, height, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 7) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        objFix.shape.SetAsBox((width/Scene.SCALE)/2, (height/Scene.SCALE)/2);
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
    
    this.CreateDynamicBox = function(x, y, width, height, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 7) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        objFix.shape.SetAsBox((width/Scene.SCALE)/2, (height/Scene.SCALE)/2);
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
    
    this.CreateStaticCircle = function(x, y, radius, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 6) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_staticBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2CircleShape(radius/(180/Math.PI));
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
    
    this.CreateKinematicCircle = function(x, y, radius, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 6) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2CircleShape(radius/(180/Math.PI));
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
    
    this.CreateDynamicCircle = function(x, y, radius, angle, thatUserData, optFixture)
    {
        var objFix;
        if (arguments.length == 6) objFix = optFixture;
        else objFix = this.CreateFixture();
        
        var objBody = new Box2D.Dynamics.b2BodyDef;
        objBody.userData = thatUserData;
        objBody.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        objBody.position.x = (x/2)/Scene.SCALE;
        objBody.position.y = y/Scene.SCALE;
        objBody.angle = angle / (180 / Math.PI);

        objFix.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
        this.world.CreateBody(objBody).CreateFixture(objFix);
        return objBody;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT STATIC VARIABLES: --------------------------------------------------------------------------

Scene.SCALE = 40;
