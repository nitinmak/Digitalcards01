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
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
       // String [] permissions = { Manifest.permission.READ_CONTACTS, Manifest.permission.WRITE_CONTACTS };
       //  // alert(permissions.READ_CONTACTS);
       //  // permissions.checkPermission(permission.READ_CONTACTS, successCallback, errorCallback);
       //  // permissions.requestPermission(permission.READ_CONTACTS, successCallback, errorCallback);
       //  cordova.requestPermissions(this, 0, permissions);
        listContacts();
    }
};
function listContacts(){

    var options = new ContactFindOptions();

    // options.filter   = "div";
    options.multiple = true;
     // alert(navigator.contacts);
        options.hasPhoneNumber = true;
    var fields = ["mobile"];
    // alert("100");
    // alert(navigator.contacts.find());
    navigator.contacts.find(fields, onSuccess, onError, options);
    // alert('fdf');
}

function onSuccess(contacts){
// alert("1001");
// alert(JSON.stringify(contacts));
    var ul = document.getElementById('contacts-list');
    for (var i = 0; i < contacts.length; i++) {
// alert(JSON.stringify(contacts[i]));
        var newLI = document.createElement('li');
        newLI.innerHTML = contacts[i].phoneNumbers[0].value;
        ul.appendChild(newLI);
    }
}

function onError(){
    alert('Some Error');
}