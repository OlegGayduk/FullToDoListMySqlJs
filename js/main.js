class Client {

    constructor() {

    	this.xhr = this.getXhrType();

    	this.listDeals();

        this.lastId = 0;
    }

    getXhrType() {

        var x;
    
        try {
            x = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                x = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                x = 0;
            }
        }
    
        if(!x && typeof XMLHttpRequest != 'undefined') x = new XMLHttpRequest();
    
        return x;
    }

    sanitize(text) {
        return text.replace(/<script>|[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gim, "");
    }

    listDeals() {

    	const xhr = this.xhr;
    
        xhr.onload = xhr.onerror = function() {

        	document.getElementsByClassName('media-progress')[0].style.width = "0px";

            if(xhr.status == 200) {
                    
                if(xhr.response != 'null') {

                	let arr = JSON.parse(xhr.response);

                	for(let i = 0;i < arr.length;i++) {

                		let d = document.createElement("div");

                    	d.className = "tasks";

                    	d.id = arr[i]['id'];
                        
                        if(arr[i]['done'] == true) {
                        	d.innerHTML = (i+1)+". <div class='tasks-text-wrap'>"+arr[i]['text']+"</div><div class='marked-btn'></div><div class='delete-btn' onclick='client.delete("+arr[i]['id']+")'></div></div>";
                        } else {
                        	d.innerHTML = (i+1)+". <div class='tasks-text-wrap'>"+arr[i]['text']+"</div><div class='mark-btn' onclick='client.mark("+arr[i]['id']+")'></div><div class='delete-btn' onclick='client.delete("+arr[i]['id']+")'></div></div>";
                        }

                		document.getElementsByClassName('tasks-wrap')[0].appendChild(d);

                        if((i+1) == arr.length) this.lastId = (i+1);
                	}
                } else {
                	console.log("You don't have any deals yet!");
                }
            } else {
                console.log('Error!');
            }
        }.bind(this);
    
        xhr.onprogress = function(event) {
        	document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
        }
      
        xhr.open('POST', "http://localhost:81/lab3MySqlJs/php/list.php");
      
        xhr.send();
    }

    add() {

    	var text = this.sanitize(document.getElementsByClassName("send-textarea")[0].value);

        if(text != "") {

            document.getElementsByClassName("send-textarea")[0].innerHTML= "";
        
    	    const xhr = this.xhr;
    
            xhr.onload = xhr.onerror = function() {

            	document.getElementsByClassName('media-progress')[0].style.width = "0px";

                if(xhr.status == 200) {
                        
                    if(xhr.response != 0) {
    
                    	let arr = JSON.parse(xhr.response);

                    	let d = document.createElement("div");

                    	d.className = "tasks";

                    	d.id = arr['id'];

                    	d.innerHTML = (this.lastId += 1)+". <div class='tasks-text-wrap'>"+arr['text']+"</div><div class='mark-btn' onclick='client.mark("+arr['id']+")'></div><div class='delete-btn' onclick='client.delete("+arr['id']+")'></div></div>";
    
                    	document.getElementsByClassName('tasks-wrap')[0].appendChild(d);
    
                    } else {
                    	console.log("Something went wrong...");
                    }
                } else {
                    console.log('Error!');
                }
            }.bind(this);
    
            xhr.onprogress = function(event) {
            	document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
            }
      
            xhr.open('POST', "http://localhost:81/lab3MySqlJs/php/add.php");

            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
            xhr.send("add_text="+encodeURIComponent(text));
        }
    }
    
    mark(id) {
        
    	const xhr = this.xhr;
    
        xhr.onload = xhr.onerror = function() {

        	document.getElementsByClassName('media-progress')[0].style.width = "0px";

            if(this.status == 200) {
                    
                if(this.response != 0) {

                	let d = document.createElement("div");

                    d.className = "marked-btn";

                	document.getElementById(id).replaceChild(d, document.getElementById(id).children[1]);
                	
                } else {
                	console.log("Something went wrong...");
                }
            } else {
                console.log('Error!');
            }
        };
    
        xhr.onprogress = function(event) {
        	document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
        }
      
        xhr.open('POST', "http://localhost:81/lab3MySqlJs/php/mark.php");

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
        xhr.send("id="+encodeURIComponent(id));
    }
    
    delete(id) {

    	const xhr = this.xhr;
    
        xhr.onload = xhr.onerror = function() {

        	document.getElementsByClassName('media-progress')[0].style.width = "0px";

            if(this.status == 200) {
                    
                if(this.response != 0) {

                	document.getElementsByClassName('tasks-wrap')[0].removeChild(document.getElementById(id));
                } else {
                	console.log("Something went wrong...");
                }
            } else {
                console.log('Error!');
            }
        };
    
        xhr.onprogress = function(event) {
        	document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
        }
      
        xhr.open('POST', "http://localhost:81/lab3MySqlJs/php/delete.php");

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
        xhr.send("id="+encodeURIComponent(id));
    }
}

client = new Client();