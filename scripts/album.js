var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');   
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
      + '</tr>'
      ;
      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    var $row = $(template);
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
 };
    
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));


    //     if (currentlyPlayingSongNumber !== null) {
    //         var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    //         currentlyPlayingCell.html(currentlyPlayingSongNumber);
    //     }
    //     if (currentlyPlayingSongNumber !== songNumber) {
    //         $(this).html(pauseButtonTemplate);
    //         setSong(songNumber);
    //         currentSoundFile.play();
    //         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    //         updateSeekBarWhileSongPlays();
    //         updatePlayerBarSong();

    //         var $volumeFill = $('.volume .fill');
    //         var $volumeThumb = $('.volume .thumb');
    //         $volumeFill.width(currentVolume + '%');
    //         $volumeThumb.css({left: currentVolume + '%'});
    //     } else if (currentlyPlayingSongNumber === songNumber) {
    //         if (currentSoundFile.isPaused()) {
    //             $(this).html(pauseButtonTemplate);
    //             $('.main-controls .play-pause').html(playerBarPauseButton);
    //             currentSoundFile.play();
    //             updateSeekBarWhileSongPlays();
    //         } else {
    //             $(this).html(playButtonTemplate);
    //             $('.main-controls .play-pause').html(playerBarPlayButton);
    //             currentSoundFile.pause();   
    //         }
    //     }
    // };
    // if (currentlyPlayingSong !== null) {
        // Revert to song number for currently playing song because user started playing new song.
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingCell.html(currentlyPlayingSong);
    }
    if (currentlyPlayingSong !== songNumber) {
        // Switch from Play -> Pause button to indicate new song is playing.
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;
    } else if (currentlyPlayingSong === songNumber) {
        // Switch from Pause -> Play button to pause currently playing song.
        $(this).html(playButtonTemplate);
        currentlyPlayingSong = null;
    }
};
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
};

var seek = function(time) {
   if (currentSoundFile) {
       currentSoundFile.setTime(time);
   }
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;

    var $albumTitle        = $('.album-view-title');
    var $albumArtist       = $('.album-view-artist');
    var $albumReleaseInfo  = $('.album-view-release-info');
    var $albumImage        = $('.album-cover-art');
    var $albumSongList     = $('.album-view-song-list');

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
        var $newRow= createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};

var setCurrentTimeInPlayerBar = function(currentTime) {
    var $currentTimeElement = $('.seek-control .current-time');
    $currentTimeElement.text(currentTime); 
};

var setTotalTimeInPlayerBar = function(totalTime) { 
    var $totalTimeElement = $('.seek-control .total-time');
    $totalTimeElement.text(totalTime); 
};

var filterTimeCode = function(timeInSeconds) {
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);
    
    var remainingSeconds = wholeSeconds % 60;
    var output = minutes + ':';
    
    if (remainingSeconds < 10) {
        output += '0';   
    }
    
    output += remainingSeconds;
    return output;
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var currentTime = this.getTime();
            var songLength = this.getDuration();
            var seekBarFillRatio = currentTime / songLength;
            var $seekBar = $('.seek-control .seek-bar');
            updateSeekPercentage($seekBar, seekBarFillRatio);
            setCurrentTimeInPlayerBar(filterTimeCode(currentTime));
        });
    }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');
    
    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
        updateSeekPercentage($(this), seekBarFillRatio);
    });
    
    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();
        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
 };

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.length));
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() { 
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);   
};

var togglePlayFromPlayerbar = function() {
    var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    if (currentSoundFile.isPaused()) {
        $currentlyPlayingCell.html(pauseButtonTemplate);
        $(this).html(playerBarPauseButton);
        currentSoundFile.play();
    } else if (currentSoundFile) {
        $currentlyPlayingCell.html(playButtonTemplate);
        $(this).html(playerBarPlayButton);
        currentSoundFile.pause();
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerbar);
});

// var albumPicasso = {
// 	name: 'The Colors',
// 	artists: 'Pablo Picasso',
// 	label: 'Cubism',
// 	year: '1881',
// 	albumArtUrl:'assets/images/album_covers/01.png',
// 	songs: [
// 		{name: 'Blue',        length:'4:26'},
// 		{name: 'Green',       length:'2:14'},
// 		{name: 'Red',         length:'2:14'},
// 		{name: 'Pink',        length:'2:14'},
// 		{name: 'Yellow',      length:'5:14'},
// 		{name: 'Chartreusse', length:'3:14'}
// 		]
// };
// var albumMarconi = {
//      name: 'The Telephone',
//      artist: 'Guglielmo Marconi',
//      label: 'EM',
//      year: '1909',
//      albumArtUrl: 'assets/images/album_covers/20.png',
//      songs: [
//          { name: 'Hello, Operator?',    length: '1:01' },
//          { name: 'Ring, ring, ring',    length: '5:01' },
//          { name: 'Fits in your pocket', length: '3:21'},
//          { name: 'Can you hear me now?',length: '3:14' },
//          { name: 'Wrong phone number',  length: '2:15'}
//      ]
//  };
//  var albumAirborne = {
//      name: 'Deluxe Edition',
//      artist: 'The Airborne Toxic Event',
//      label: 'Sony',
//      year: '2009',
//      albumArtUrl: 'assets/images/album_covers/airborne.png',
//      songs: [
//          { name: 'Wishing Well ',                     length: '3:57' },
//          { name: 'Papillion',                         length: '3:17' },
//          { name: 'Gasoline',                          length: '3:20'},
//          { name: 'Happiness Is Overrated',            length: '3:11' },
//          { name: 'Does This Mean You are Moving On?', length: '2:13'},
//          { name: 'This is Nowhere',                   length: '2:49'},
//          { name: 'Something Around Midnight',         length: '3:04'},
//          { name: 'Something New',                     length: '2:13'},
//          { name: 'Missy',                             length: '3:39'}
//      ]
//  };
//  var createSongRow = function(songNumber, songName, songLength) {
//      var template =
//         '<tr class="album-view-song-item">'
//       + '  <td class="song-item-number">' + songNumber + '</td>'
//       + '  <td class="song-item-title">' + songName + '</td>'
//       + '  <td class="song-item-duration">' + songLength + '</td>'
//       + '</tr>'
//       ;
 
//      return template;
 
// };
// // var clickThrough = function(albumArtUrl){
// // 	//select the class that holds the album art
// // 	var pickMe = document.getElementsByClassName('album-cover-art');
// // 	'album-cover-art'.addEventListener('click', funcgtion(e){

// // 	//bind that to set Current album selection
	
// // 	})

// var setCurrentAlbum = function(album) {
//      // #1
//      var albumTitle = document.getElementsByClassName('album-view-title')[0];
//      var albumArtist = document.getElementsByClassName('album-view-artist')[0];
//      var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
//      var albumImage = document.getElementsByClassName('album-cover-art')[0];
//      var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
//      // #2
//      albumTitle.firstChild.nodeValue = album.name;
//      albumArtist.firstChild.nodeValue = album.artist;
//      albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
//      albumImage.setAttribute('src', album.albumArtUrl);
 
//      // #3
//      albumSongList.innerHTML = '';
 
//      // #4
//      for (i = 0; i < album.songs.length; i++) {
//          albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
//      }
//  };
//  var findParentByClassName = function(element, targetClass) {
//     var currentParent = element.parentElement;

//     if(currentParent){
//         while (currentParent.className && currentParent.className != targetClass){
//             currentParent = currentParent.parentElement
//         }
//         if(currentParent.className == targetClass){
//             return currentParent;
//         } else {
//             alert('no parent with that class name found')
//         }
//     }else{
//         alert("no parent found");
//     }

// };
// var getSongItem = function(element) {
//     switch (element.className) {
//         case 'album-song-button':
//         case 'ion-play':
//         case 'ion-pause':
//             return findParentByClassName(element, 'song-item-number');
//         case 'album-view-song-item':
//             return element.querySelector('.song-item-number');
//         case 'song-item-title':
//         case 'song-item-duration':
//             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//         case 'song-item-number':
//             return element;
//         default:
//             return;
//     };
//     var clickHandler = function(targetElement) {
//         var songItem = getSongItem(targetElement); 
//         if (currentlyPlayingSong === null) {
//          songItem.innerHTML = pauseButtonTemplate;
//          currentlyPlayingSong = songItem.getAttribute('data-song-number');
//      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//          songItem.innerHTML = playButtonTemplate;
//          currentlyPlayingSong = null;
//       } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//          var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//          songItem.innerHTML = pauseButtonTemplate;
//          currentlyPlayingSong = songItem.getAttribute('data-song-number');
//      } 
 
 
//  };  

//  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//   // Store state of playing songs
//  var currentlyPlayingSong = null;


//  window.onload = function() {
//      setCurrentAlbum(albumPicasso);
//  };
// var album= [' albumPicasso ', 'albumMarconi','albumAirborne']
// var index= 1;
// var albumImage = document.getElementsByClassName('album-cover-art')[0];
// albumImage.addEventListener("click", function(e){
// 	setCurrentAlbum(album[index]);
// 	index++;
// 	if (index == album.length){
// 		index = 0;
// 	}
// });
// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
// var songRows = document.getElementsByClassName('album-view-song-item')[0];
// var playButtonTemplate = '"<a class="album-song-button"><span class = "ion-play"></span></a>"'

// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

//  window.onload = function() {
//      setCurrentAlbum(albumPicasso);

//      songListContainer.addEventListener('mouseover', function(event) {
//         if(event.target.parentElement.className === 'album-view-song-item'{
//              var songItem = getSongItem(event.target);
// +
// +            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
// +                songItem.innerHTML = playButtonTemplate;
// +            }
//         })
//          // #1
//          console.log(event.target);
//      });

// 	// 	//only target song rows during event delegation
// 	// 	if(event.target.songRows.className === 'album-view-song-item'){
// 	// 		event.target.parentElements.querySelector('song-item-number').innerHTML = playButtonTemplate;
// 	// 	}
// 	// };
// 	for(i=0; i<songRows.length; i++){
// 		songRows[i].addEventListener('mouseleave',function(event){
//             //#1
// 			  var songItem = getSongItem(event.target);
//              var songItemNumber = songItem.getAttribute('data-song-number');
 
//              // #2
//              if (songItemNumber !== currentlyPlayingSong) {
//                  songItem.innerHTML = songItemNumber;
//              }
//          });

       
       
//         songRows[i].addEventListener('click', function(event) {
//              // Event handler call
//              clickHandler(event.target);
//          });
// 	}

	
	
	
	
