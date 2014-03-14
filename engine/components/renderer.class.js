
function Renderer()
{
    // INNER CLASS: --------------------------------------------------------------------------------
    
    function Sprite()
    {
        this.anim;
    }
    
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.gameObject;
    this.sprites;
    this.spriteIndex;
    this.spriteAnim;
    
    this.spriteLastTime;
    this.spriteTimeOffset;
    
    // UPDATE FUNCTION: ----------------------------------------------------------------------------
    
    this.Update = function()
    {
        var currentTime = new Date;
        if (this.spriteLastTime.getTime() + this.spriteTimeOffset < currentTime.getTime())
        {
            this.spriteLastTime = new Date;
            var nextSpriteAnim = this.spriteAnim + 1;
            if (nextSpriteAnim >= this.sprites[this.spriteIndex].anim.length) nextSpriteAnim = 0;
            this.spriteAnim = nextSpriteAnim;
        }
    }
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        this.spriteTimeOffset = 90;
        this.spriteLastTime = new Date;
    }
    
    // SPRITE SETTERS: -----------------------------------------------------------------------------
    
    this.BeforeStart = function()
    {
        this.spriteIndex = 0;
        this.spriteAnim  = 0;
        this.sprites = new Array();
    }
    
    this.SetSprite = function(i, j, img)
    {
        if (j == 0) 
        {
            this.sprites[i] = new Sprite();
            this.sprites[i].anim = new Array(); 
        }
        
        this.sprites[i].anim[j] = new Image();
        this.sprites[i].anim[j].src = img;
    }
    
    this.ChangeAnimation = function(animID)
    {
        this.spriteAnim  = 0;
        this.spriteIndex = animID;
    }
    
    // SPRITE GETTERS: -----------------------------------------------------------------------------
    
    this.GetSprite = function()
    {
        return this.sprites[this.spriteIndex].anim[this.spriteAnim];
    }
}