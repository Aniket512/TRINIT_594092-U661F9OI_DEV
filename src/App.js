import { useState } from 'react';
import './App.css';
/*global chrome*/
function App() {
  
  chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      // Get the Content-Length header

      const contentLengthHeader = details.responseHeaders.find(header => header.name.toLowerCase() === 'content-length');
      if (contentLengthHeader) {
        // Calculate the size of the response body
        const responseSize = parseInt(contentLengthHeader.value);
        
        // Add the data transferred to the total
        setDataTransfer(localStorage.getItem(details.url) + responseSize);
        setUrl(details.url);
        localStorage.setItem(details.url, responseSize);
        // Log the data transferred for this request
        console.log(`Data transferred for ${details.url}: ${totalDataTransferred} bytes`);
      }
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
  );
  

  // Add a listener for the browser action to display the total data transferred
  chrome.browserAction.onClicked.addListener(function (tab) {
    // Display the total data transferred in a popup
    alert(`Total data transferred: ${totalDataTransferred} bytes`);
  });
  return (

    <div className="App">
      <h1>{url} - {totalDataTransferred}</h1>
    </div>
  );
}

export default App;
