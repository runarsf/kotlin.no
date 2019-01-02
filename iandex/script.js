show = 1;
hide = 0;

// https://www.gun.io/blog/multi-line-strings-in-json
function openfile(textFile) {
	$(function(){
		$.getJSON('texts.json', function(data) {
			$.each(data.milton, function(i, mla) {
				if(textFile === mla.title+'.'+mla.type) {
					$('ul').empty();
					scratchpad(show);
					// $('ul').append('<li>'+mla.title+'.'+mla.type+'</li>');
					document.title = mla.title+'.'+mla.type;
					$('ul').append('<li>'+mla.content.join('<br/>')+'</li>&nbsp')
				}
			});
		}).error(function(){
			console.log('jQuery: json error');
		});
	});
}

arr = ['1', '2']
function stdout(content) {

}

function scratchpad(state) {
	if(state === show) {
		document.getElementById('allfiles').style.visibility = 'hidden';
		document.getElementById('scratchpad').style.visibility = 'visible';
		document.getElementById('button').style.visibility = 'visible';
		document.getElementById('bgblur').style.visibility = 'visible';
	}
	else if(state === hide) {
		document.title = 'iandex';
		document.getElementById('scratchpad').style.visibility = 'hidden';
		document.getElementById('button').style.visibility = 'hidden';
		document.getElementById('bgblur').style.visibility = 'hidden';
	}
}

document.addEventListener('keydown', event => {
	if(event.keyCode === 13) { // enter
		alert(document.getElementById('input-field').value);
	}
	if(event.keyCode === 9) { // tab
		allFiles();
	}
	if(event.keyCode === 27) { // esc
		allFiles('hide');
		scratchpad(hide);
	}
});

function allFiles(optional) {
	if(optional === 'hide') {
		document.getElementById('allfiles').style.visibility = 'hidden';
	}
	else {
		scratchpad(hide);
		allfs = document.getElementById('allfiles').style.visibility;
		if(allfs !== 'visible') {
			document.getElementById('allfiles').style.visibility = 'visible';
			$(function(){
				$.getJSON('texts.json', function(data) {
					console.log('jQuery: successfully imported json');
					$('ul').empty();
					$.each(data.milton, function(i, mla) {
						if(mla.title+'.'+mla.type !== '.') {
							let file=mla.title+'.'+mla.type
							$('ul').append('<li onclick="openfile(\''+file+'\')">'+mla.title+'.'+mla.type+'</li>');
						}
					});
				}).error(function(){
					console.log('jQuery: json error');
				});
			});
		}
		else {
			allFiles('hide');
		}
	}
}