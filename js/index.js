/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //var MyContactList = new Array();
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
		//alert("inside here"+id);
        //var listeningElement = parentElement.querySelector('.listening');
		//alert("outside here");
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
       // String [] permissions = { Manifest.permission.READ_CONTACTS, Manifest.permission.WRITE_CONTACTS };
       //  // alert(permissions.READ_CONTACTS);
       //  // permissions.checkPermission(permission.READ_CONTACTS, successCallback, errorCallback);
       //  // permissions.requestPermission(permission.READ_CONTACTS, successCallback, errorCallback);
       //  cordova.requestPermissions(this, 0, permissions);
        listContacts();
		//alert("outside here");
    }
};
function listContacts(){

    var options = new ContactFindOptions();

    // options.filter   = "div";
    options.multiple = true;
     // alert(navigator.contacts);
        options.hasPhoneNumber = true;
    var fields = ["mobile","displayName"];
    // alert("100");
    // alert(navigator.contacts.find());
    navigator.contacts.find(fields, onSuccess, onError, options);
    // alert('fdf');
}

function onSuccess(contacts){
 //alert("1001");
// alert(JSON.stringify(contacts));
    //var ul = document.getElementById('contacts-list');
	var x = document.getElementById("contacts-list");
    for (var i = 0; i < contacts.length; i++) {
// alert(JSON.stringify(contacts[i]));
		//MyContactList.push(contacts[i].phoneNumbers[0].value);
        /*var newLI = document.createElement('li');
        newLI.innerHTML = contacts[i].phoneNumbers[0].value;
        ul.appendChild(newLI);*/
		 
			
			var option = document.createElement("option");
			option.value =  contacts[i].phoneNumbers[0].value;
			option.text = contacts[i].displayName;
            // alert(option)
			x.add(option);
    }
}

function onError(){
    alert('Some Error');
}
$(document).on('click', '#choose_contact', function() {
  
    alert('ffd');
      $('#contacts-list').click();
// displaycontacts();
   })
function displaycontacts()
{
navigator.contacts.pickContact(function(contact){
    var  contact_name =  contact.displayName;
    var contact_number = contact.phoneNumbers[0].value;
    var trim = contact_number.replace(/\s/g,'');
    document.getElementById("receivermobile").value = trim.slice(-10);
    document.getElementById("receivername").value =  contact_name;
        // alert('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
        console.log('Error: ' + err);
    });
    // alert('here');
    //  $('.pages').prepend(' <div class="loader justify-content-center "><div class="maxui-roller align-self-center"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    // $('.loader').css('display','flex');
    //   $('#contacts-list').click();
    //    $('.loader').css('display','none');
	// var x = document.getElementById("showcontacts");
 //  if (x.style.display === "none") {
 //    x.style.display = "block";
 //  } else {
 //    x.style.display = "none";
 //  }
  document.getElementById('contacts-list').selectedIndex = 0;
}

function updateContacts()
{
	
	var selectBox = document.getElementById("contacts-list");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	var selectedText = selectBox.options[selectBox.selectedIndex].text;
alert($.trim(selectedValue.slice(-11)));
	document.getElementById("receivermobile").value = $.trim(selectedValue.slice(-11));
	document.getElementById("receivername").value =  selectedText;
	displaycontacts();
}