function(id) {
	var id = $(this).attr('id');
	alert(id);
	//play audio
 	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'sound/'+id+'.mp3');
	audioElement.setAttribute('autoplay', 'autoplay');
    //audioElement.load()
    $.get();
	audioElement.addEventListener("load", function() {
	audioElement.play();
    }, true);
    audioElement.play();
    //END to play audio
    // $container.cycle(id.replace('pager_', ''));
    return false;
}