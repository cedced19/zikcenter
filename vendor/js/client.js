(function($){

    var socket = io.connect(window.location.host),
          musics = false,
          lastnumber = false,
          audio = $('audio'),
          currentzic = new Object();


        socket.on('setMusic', function(array){
            musics = array;
            setMusic();
            displayList();
        });


        setInterval(function () {
              if (audio[0].paused) {
                                setMusic();
            }
        }, 1000);


        function setMusic () {
            if (musics !== null){
                    var zic = musics[getNumber()];
                    currentzic.name = getShiny(zic);
                    currentzic.url = 'http://' + window.location.host + '/sources/' + zic;
                    $('#current').text(currentzic.name);
                    audio.attr('src', currentzic.url);
                    audio[0].play();
            }
        }


        function getNumber () {
                 if (musics !== null){
                    var musicsLength = '';
                    for(var i = 0; i < musics.length; i++) {
                        musicsLength += i;
                    }
                    var chars = '0' + musicsLength.replace(musics.length -1,'');
                    var stringLength = 1;
                    var number = '';
                    for(var i = 0; i < stringLength; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        number += chars.substring(rnum, rnum + 1);
                    }
                    if (lastnumber != number){
                        lastnumber = number
                        return number;
                    }else{
                        return getNumber();
                    }

            }
        }

        $('#change').click(function(event){
            event.preventDefault();
            setMusic();
         });

        function getShiny (name) {
             name = name.charAt(0).toUpperCase()  + name.substring(1).toLowerCase().replace('.mp3', '');
             name = name.replace(/-/g, ' ');
             return name;
        }

        function displayList () {
            for (var k in musics){
                var music = $('<li>').text(getShiny(musics[k]));
                music.attr('id', musics[k]);
                music.appendTo($('#list'));
            }
        }


})(jQuery);