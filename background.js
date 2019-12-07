// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "flashford");

  var credentials_flashford = {
    app_id: "85ec0698",
    app_key: "e8b94bb451ee3ab953b729846ba63d3d",
  };

  function getWordFromOxford(props){

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    var word = props.word;
    var domains = props.domains ? ',domains': '';
    var etymologies = props.etymologies ? ',etymologies': '';
    var examples = props.examples ? ',examples': '';
    var pronunciations = props.pronunciations ? ',pronunciations': '';
    var regions = props.regions ? ',regions': '';
    var registers =   props.registers ? ',registers': '';
    var variantForms = props.variantForms ? ',variantForms': '';

    var path_flashford = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-us/'+word+'?fields=definitions'+domains+
    etymologies+examples+pronunciations+regions+registers+variantForms+'&strictMatch=false';
    console.log(path_flashford);

    xhr.open("GET", path_flashford);
  
    xhr.setRequestHeader("app_id", credentials_flashford.app_id);
    xhr.setRequestHeader("app_key", credentials_flashford.app_key);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.19.0");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "5470f1a4-c681-42d4-b990-9d011bee1111,c57effb6-9025-4fb3-84b2-42efad18a055");
    xhr.setRequestHeader("Host", "od-api.oxforddictionaries.com");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(null);
  
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          port.postMessage({ action: 'word-definition', message: JSON.parse(xhr.response)});
        }
      }
    };
  }

  port.onMessage.addListener(function(msg) {
    switch(msg.action){
      case 'get-word-definition': {
        getWordFromOxford(msg.message);
        break;
      }
      default: {
        console.log("the server didn't identify the message", msg);
      }
    }
  });

  
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
