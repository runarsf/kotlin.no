// Search on enter key event
	document.getElementById('search').style.display = 'none';
    function search(e) {
        if (e.keyCode == 13) {
            var val = document.getElementById("search-field").value;
            if (val == val.trim()) {
              	newVal = val.replace("https://", "").replace("http://", "")
                window.location = "https://" + newVal;
            }
            else {
                window.location = "https://duckduckgo.com/?q=" + val.trim();
            }
        }
    }

    document.addEventListener("keydown", event => {
        if (event.keyCode == 32) {          // Spacebar code to open search
            document.getElementById('search').style.display = 'flex';
            document.getElementById('search-field').focus();
        } else if (event.keyCode == 27) {   // Esc to close search
            document.getElementById('search-field').value = '';
            document.getElementById('search-field').blur();
            document.getElementById('search').style.display = 'none';
        }
    });