var albumPicasso = {
	name: 'The Colors',
	artists: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl:'assets/images/album_covers/01.png',
	songs: [
		{name: 'Blue',        length:'4:26'},
		{name: 'Green',       length:'2:14'},
		{name: 'Red',         length:'2:14'},
		{name: 'Pink',        length:'2:14'},
		{name: 'Yellow',      length:'5:14'},
		{name: 'Chartreusse', length:'3:14'}
		]
};
var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?',    length: '1:01' },
         { name: 'Ring, ring, ring',    length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?',length: '3:14' },
         { name: 'Wrong phone number',  length: '2:15'}
     ]
 };
 var albumAirborne = {
     name: 'Deluxe Edition',
     artist: 'The Airborne Toxic Event',
     label: 'Sony',
     year: '2009',
     albumArtUrl: 'assets/images/album_covers/airborne.png',
     songs: [
         { name: 'Wishing Well ',                     length: '3:57' },
         { name: 'Papillion',                         length: '3:17' },
         { name: 'Gasoline',                          length: '3:20'},
         { name: 'Happiness Is Overrated',            length: '3:11' },
         { name: 'Does This Mean You are Moving On?', length: '2:13'},
         { name: 'This is Nowhere',                   length: '2:49'},
         { name: 'Something Around Midnight',         length: '3:04'},
         { name: 'Something New',                     length: '2:13'},
         { name: 'Missy',                             length: '3:39'}
     ]
 };
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 
};
// var clickThrough = function(albumArtUrl){
// 	//select the class that holds the album art
// 	var pickMe = document.getElementsByClassName('album-cover-art');
// 	'album-cover-art'.addEventListener('click', funcgtion(e){

// 	//bind that to set Current album selection
	
// 	})

var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 };
 var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
        currentParent = currentParent.parentElement;
    }
    return currentParent;
};
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    };
    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement); 
        if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } 
 
 
 };  

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  // Store state of playing songs
 var currentlyPlayingSong = null;


 window.onload = function() {
     setCurrentAlbum(albumPicasso);
 };
var album= [' albumPicasso ', 'albumMarconi','albumAirborne']
var index= 1;
var albumImage = document.getElementsByClassName('album-cover-art')[0];
albumImage.addEventListener("click", function(e){
	setCurrentAlbum(album[index]);
	index++;
	if (index == album.length){
		index = 0;
	}
});
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item')[0];
var playButtonTemplate = '"<a class="album-song-button"><span class = "ion-play"></span></a>"'

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function(event) {
        if(event.target.parentElement.className === 'album-view-song-item'{
             var songItem = getSongItem(event.target);
+
+            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
+                songItem.innerHTML = playButtonTemplate;
+            }
        })
         // #1
         console.log(event.target);
     });

	// 	//only target song rows during event delegation
	// 	if(event.target.songRows.className === 'album-view-song-item'){
	// 		event.target.parentElements.querySelector('song-item-number').innerHTML = playButtonTemplate;
	// 	}
	// };
	for(i=0; i<songRows.length; i++){
		songRows[i].addEventListener('mouseleave',function(event){
            //#1
			  var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });

       
       
        songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
	}

	
	
	
	
