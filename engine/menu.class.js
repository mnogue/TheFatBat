
function Menu()
{
    // VARIABLES: ----------------------------------------------------------------------------------
    
    this.slider1 = "slider1";
    this.slider2 = "slider2";
    
    this.game       = "game";
    this.select     = "select";
    this.menu       = "menu";
    this.menu_title = "menu_title";
    this.menu_play  = "menu_play";
    this.gameui     = "gameui";
    this.gameui_rep = "gameui_replay";
    this.gameui_lvs = "gameui_lvselect";
    this.victory    = "victory";
    
    this.slider1Open;
    this.slider2Open;
    this.slider1Close;
    this.slider2Close;
    
    
    // START FUNCTION: -----------------------------------------------------------------------------
    
    this.Start = function()
    {
        this.slider1Open  = -(_settings.width/2)+"px";
        this.slider2Open  =  (_settings.width)+"px";
        this.slider1Close = "0px";
        this.slider2Close = (_settings.width/2)+"px";
        
        $("div#"+this.game).width(_settings.width);
        $("div#"+this.game).height(_settings.height);
        
        $("div#"+this.slider1).width(_settings.width/2).height(_settings.height).css('left', this.slider1Close);
        $("div#"+this.slider2).width(_settings.width/2).height(_settings.height).css('left', this.slider2Close);
        
        $("div#"+this.menu).width(_settings.width);
        $("div#"+this.menu).height(_settings.height);
        
        $("div#"+this.select).width(_settings.width);
        $("div#"+this.select).height(_settings.height);
        
        $("div#"+this.gameui).width(_settings.width);
        $("div#"+this.gameui).height(_settings.height);
        
        $("div#"+this.victory).width(_settings.width);
        $("div#"+this.victory).height(_settings.height);
        
        $("div#"+_engine.menu.menu).show();
        $("div#"+this.slider1).animate({left: _engine.menu.slider1Open}, 1000, 'easeInOutSine');
        $("div#"+this.slider2).animate({left: _engine.menu.slider2Open}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.menu).append("<div class='menu_title' id='menu_title'></div>");
            $("div#"+_engine.menu.menu).append("<div class='menu_play'  id='menu_play' onclick='_engine.menu.Menu2Select()'></div>");
            $('div#'+_engine.menu.menu_title).animate({top: '20px'}, 1000, 'easeOutBounce');
            $('div#'+_engine.menu.menu_play).delay(1200).animate({opacity: 1.0, top: '350px'}, 500, 'easeInOutSine');
            
            /** DEBUG **/
            /*
            $("div#"+_engine.menu.menu).html("").hide();
            $("div#"+_engine.menu.select).html("").hide();
            $("div#"+_engine.menu.menu).html("").hide();
            _engine.LoadLevel(_engine.levels[14]);
            */
            /** END-DEBUG **/
        });
    }
    
    // TRANSITION: menu => level select ------------------------------------------------------------
    
    this.Menu2Select = function()
    {
        $('div#'+this.menu_play).animate({opacity: 0.0, top: '500px'}, 300, 'easeInOutSine', function()
        {
            $(this).remove();
        });
        
        $('div#'+this.menu_title).animate({top: '-200px'}, 600, 'easeInBack', function()
        {
            $(this).remove();
            $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
            $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
            {
                $("div#"+_engine.menu.menu).html("").hide();
                $("div#"+_engine.menu.select).show();
                
                $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Open}, 1000, 'easeInOutSine');
                $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Open}, 1000, 'easeInOutSine');
                
                for (var i in _engine.levels)
                {
                    var element = "";
                    if (localStorage.getItem('lv'+i+'_available') || i == 0)
                    {
                        var classStars = "select_level_stars0";
                        if (localStorage.getItem('lv'+i+'_stars') == 1) classStars = "select_level_stars1";
                        if (localStorage.getItem('lv'+i+'_stars') == 2) classStars = "select_level_stars2";
                        if (localStorage.getItem('lv'+i+'_stars') == 3) classStars = "select_level_stars3";
                        element += "<div class='select_level "+classStars+"' id='level_select_"+i+"' ";
                        element += "onclick=\"_engine.menu.Select2Game('"+_engine.levels[i]+"')\">"+(parseInt(i)+1)+"<div>";
                        $("div#"+_engine.menu.select).append(element);
                        $("div#level_select_"+i).delay((i*50)+500).animate({opacity: 1.0}, 400);
                    }
                    else
                    {
                        element += "<div class='select_level_denied' id='level_select_"+i+"' ";
                        element += "<div>";
                        $("div#"+_engine.menu.select).append(element);
                        $("div#level_select_"+i).delay((i*50)+500).animate({opacity: 1.0}, 400);
                    }
                }
                
                var back = "";
                back += "<div class='select_level select_level_stars0' id='level_select_back' ";
                back += "onclick='_engine.menu.Select2Menu()'>Back<div>";
                $("div#"+_engine.menu.select).append(back);
                $("div#level_select_back").delay(500).animate({opacity: 1.0}, 400);
            });
        });
    }
    
    // TRANSITION: level select => menu ------------------------------------------------------------
    
    this.Select2Menu = function()
    {
        $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.select).html("").hide();
            $("div#"+_engine.menu.menu).show();
            $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Open}, 1000, 'easeInOutSine');
            $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Open}, 1000, 'easeInOutSine', function()
            {
                $("div#"+_engine.menu.menu).append("<div class='menu_title' id='menu_title'></div>");
                $("div#"+_engine.menu.menu).append("<div class='menu_play'  id='menu_play' onclick='_engine.menu.Menu2Select()'></div>");
                $('div#'+_engine.menu.menu_title).animate({top: '20px'}, 1000, 'easeOutBounce');
                $('div#'+_engine.menu.menu_play).delay(1200).animate({opacity: 1.0, top: '350px'}, 500, 'easeInOutSine');
            });
        });
    }
    
    // TRANSITION: level select => game view -------------------------------------------------------
    
    this.Select2Game = function(level)
    {
        $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.select).html("").hide();
            $("div#"+_engine.menu.gameui).show();
            $("div#"+_engine.menu.gameui).append("<div class='gameui_replay'   id='gameui_replay'   onclick='_engine.menu.Replay()'></div>");
            $("div#"+_engine.menu.gameui).append("<div class='gameui_lvselect' id='gameui_lvselect' onclick='_engine.menu.Game2Select()'></div>");
            _engine.LoadLevel(level);
        });
    }
    
    // TRANSITION: game view => level select -------------------------------------------------------
    
    this.Game2Select = function()
    {
        $("div#"+_engine.menu.gameui).html("").hide();
        $("div#"+_engine.menu.victory).html("").hide();
        _engine.scene.sceneLoaded = false;
        _engine.scene = null;
        $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.select).show();
            
            $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Open}, 1000, 'easeInOutSine');
            $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Open}, 1000, 'easeInOutSine');
            
            for (var i in _engine.levels)
            {
                var element = "";
                if (localStorage.getItem('lv'+i+'_available') || i == 0)
                {
                    var classStars = "select_level_stars0";
                    if (localStorage.getItem('lv'+i+'_stars') == 1) classStars = "select_level_stars1";
                    if (localStorage.getItem('lv'+i+'_stars') == 2) classStars = "select_level_stars2";
                    if (localStorage.getItem('lv'+i+'_stars') == 3) classStars = "select_level_stars3";
                    element += "<div class='select_level "+classStars+"' id='level_select_"+i+"' ";
                    element += "onclick=\"_engine.menu.Select2Game('"+_engine.levels[i]+"')\">"+(parseInt(i)+1)+"<div>";
                    $("div#"+_engine.menu.select).append(element);
                    $("div#level_select_"+i).delay((i*50)+500).animate({opacity: 1.0}, 400);
                }
                else
                {
                    element += "<div class='select_level_denied' id='level_select_"+i+"' ";
                    element += "<div>";
                    $("div#"+_engine.menu.select).append(element);
                    $("div#level_select_"+i).delay((i*50)+500).animate({opacity: 1.0}, 400);
                }
            }
            
            var back = "";
            back += "<div class='select_level select_level_stars0' id='level_select_back' ";
            back += "onclick='_engine.menu.Select2Menu()'>Back<div>";
            $("div#"+_engine.menu.select).append(back);
            $("div#level_select_back").delay(500).animate({opacity: 1.0}, 400);
        });
    }
    
    // TRANSITION: replay --------------------------------------------------------------------------
    
    this.Replay = function()
    {
        $("div#"+_engine.menu.gameui).html("").hide();
        $("div#"+_engine.menu.victory).html("").hide();
        _engine.scene.sceneLoaded = false;
        var currentLevel = _engine.scene.levelID;
        _engine.scene = null;
        $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.gameui).html("").hide();
            $("div#"+_engine.menu.gameui).show();
            $("div#"+_engine.menu.gameui).append("<div class='gameui_replay'   id='gameui_replay'   onclick='_engine.menu.Replay()'></div>");
            $("div#"+_engine.menu.gameui).append("<div class='gameui_lvselect' id='gameui_lvselect' onclick='_engine.menu.Game2Select()'></div>");
            _engine.LoadLevel(currentLevel);
        });
    }
    
    // TRANSITION: next ----------------------------------------------------------------------------
    
    this.Next = function(level)
    {
        switch (level)
        {
            case "001" : level = "002"; break;
            case "002" : level = "003"; break;
            case "003" : level = "004"; break;
            case "004" : level = "005"; break;
            case "005" : level = "006"; break;
            case "006" : level = "007"; break;
            case "007" : level = "008"; break;
            case "008" : level = "009"; break;
            case "009" : level = "010"; break;
            case "010" : level = "011"; break;
            case "011" : level = "012"; break;
            case "012" : level = "013"; break;
            case "013" : level = "014"; break;
            case "014" : level = "015"; break;
        }
        
        $("div#"+_engine.menu.victory).html("").hide();
        $("div#"+_engine.menu.gameui).show();
        $("div#"+_engine.menu.gameui).append("<div class='gameui_replay'   id='gameui_replay'   onclick='_engine.menu.Replay()'></div>");
        $("div#"+_engine.menu.gameui).append("<div class='gameui_lvselect' id='gameui_lvselect' onclick='_engine.menu.Game2Select()'></div>");
        _engine.LoadLevel(level);
    }
    
    // VICTORY MENU: -------------------------------------------------------------------------------
    
    this.VictoryMenu = function()
    {
        var stars = _engine.scene.stars;
        var currentLevel = _engine.scene.levelID;
        var nextLevel = 0;
        switch (currentLevel)
        {
            case "001" : nextLevel = 1;  break;
            case "002" : nextLevel = 2;  break;
            case "003" : nextLevel = 3;  break;
            case "004" : nextLevel = 4;  break;
            case "005" : nextLevel = 5;  break;
            case "006" : nextLevel = 6;  break;
            case "007" : nextLevel = 7;  break;
            case "008" : nextLevel = 8;  break;
            case "009" : nextLevel = 9;  break;
            case "010" : nextLevel = 10; break;
            case "011" : nextLevel = 11; break;
            case "012" : nextLevel = 12; break;
            case "013" : nextLevel = 13; break;
            case "014" : nextLevel = 14; break;
        }
        
        localStorage.setItem('lv'+nextLevel+'_available', true);
        if (!localStorage.getItem('lv'+(nextLevel-1)+'_stars') || localStorage.getItem('lv'+(nextLevel-1)+'_stars') <= stars)
        {
            localStorage.setItem('lv'+(nextLevel-1)+'_stars', stars);
        }
        
        $("div#"+_engine.menu.slider1).animate({left: _engine.menu.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+_engine.menu.slider2).animate({left: _engine.menu.slider2Close}, 1000, 'easeInOutSine', function()
        {
            $("div#"+_engine.menu.victory).show();
            $("div#"+_engine.menu.victory).append("<div class='victory_stars victory_stars_"+stars+"' id='victory_stars'></div>");
            $("div#"+_engine.menu.victory).append("<div class='victory_replay' id='victory_replay'   onclick='_engine.menu.Replay()'></div>");
            $("div#"+_engine.menu.victory).append("<div class='victory_lvselect' id='victory_lvselect' onclick='_engine.menu.Game2Select()'></div>");
            
            if (currentLevel < 15)
            {
                $("div#"+_engine.menu.victory).append("<div class='victory_next' id='victory_next' onclick=\"_engine.menu.Next('"+currentLevel+"')\"></div>");
            }
            else
            {
                $("div#"+_engine.menu.victory).append("<div class='victory_comingsoon' id='victory_comingsoon'></div>");
            }
        });
    }
    
    // SLIDER FUNCTIONS: ---------------------------------------------------------------------------
    
    this.OpenSliders = function()
    {
        $("div#"+this.slider1).animate({left: this.slider1Open}, 1000, 'easeInOutSine');
        $("div#"+this.slider2).animate({left: this.slider2Open}, 1000, 'easeInOutSine');
    }
    
    this.CloseSliders = function()
    {
        $("div#"+this.slider1).animate({left: this.slider1Close}, 1000, 'easeInOutSine');
        $("div#"+this.slider2).animate({left: this.slider2Close}, 1000, 'easeInOutSine');
    }
    
    // HIDE GAME UI: -------------------------------------------------------------------------------
    
    this.HideGameUI = function()
    {
        $("div#"+_engine.menu.gameui).html("").hide();
    }
}