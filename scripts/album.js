var albumPicasso = {
	name: 'The Colors',
	artists: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl:'assets/images/album_covers/01.png',
	song: [
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
     song: [
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
     song: [
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
var createSongRow = function(songNumber, songName, songLength){
	var template = 
	'<tr class = "album-view-song-item">'
	
		+'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
			+ ' <td class = "song-item-title">   '  + songTitle  + '</td>'
			+ ' <td class = "song-item-duration">'  + songLength + '</td>'
	'</tr>'
	;
	return template;
};
// var clickThrough = function(albumArtUrl){
// 	//select the class that holds the album art
// 	var pickMe = document.getElementsByClassName('album-cover-art');
// 	'album-cover-art'.addEventListener('click', funcgtion(e){

// 	//bind that to set Current album selection
	
// 	})

var setCurrentAlbum = function(album){
	/*#1we select all of the HTML elements required to display on the album page:
	 title, artist, release info,image, and song list. We want to populate 
	 these elements with information. To do so, we assign the corresponding values 
	of the album objects' properties to the HTML elements.*/
	var albumTitle       =  document.getElementsByClassName('album-view-title')[0];
	var albumArtist      =  document.getElementsByClassName('album-view-artist')[0];
	var albumReleaseInfo =  document.getelementsByClassName('album-release-info')[0];
	var albumSongList    =  document.getElementsByClassName('album-view-song-list')[0];

	/*the firstChild property identifies the first child node of an element, and nodeValue
	 returns or sets the value of a node. Alternatively, we could technically use innerHTML 
	 to insert plain text (like we did in collection.js), but it's excessive and semantically 
	 misleading in this context because we aren't adding any HTML.
     For example, the .albumTitle element has only one node and it's a text node.
      When we use the firstChild property and nodeValue properties together on the 
      .albumTitle element, we set the value of that text node to album.name.
     When we populated our collection view with albums, we initially set the value 
     of the parent container's innerHTML to an empty string. This ensured that we 
     were working with a clean slate. */
	albumTitle.firstChild.nodeValue = album.title;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label

	// #3 clear the album song list HTML to make sure there are no interfering elements.
     albumSongList.innerHTML = '';
	 for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 };

    /*#4 for loop to go through all the songs from the specified album object 
    and insert them into the HTML using the innerHTML property.
     The createSongRow function is called at each loop, passing in the song number, 
     name, and length arguments from our album object*/
     window.onload = function() {
     setCurrentAlbum(albumPicasso);
 

};

var album= [' albumPicasso ', 'albumMarconi','albumAirborne']
var index= 1;
albumImage.addEventListener("click", function(e){
	setCurrentAlbum(album[index]);
	index++;
	if (index == album.length){
		index = 0;
	}
});
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = "<a class="album-song-button"><span class = "ion-play"></span></a>"

window.onload = function(){
	setCurrentAlbum(albumPicasso);
	songListContainer.addEventListener('mouseover',function(event){
		console.log(event.target);
		//only target song rows during event delegation
		if(event.target.parentElement.className === 'album-view-song-item'){
			event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
		}
	});
	for(i=0; i<songRows.length; i++){
		songRows[i].addEventLisener('mouseleave',function(event){
			 this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
	
	}
	};
	
