import {HTMLHelper} from './helpers/HTMLHelper.js';
import {EditorHelper} from './helpers/EditorHelper.js';
import {EventHelper} from './helpers/EventHelper.js';
import {ManipulationHelper} from './helpers/ManipulationHelper.js';

(() => {
  // Setup a cursor and a dragger.
  //
  EditorHelper.setup();
  
  // Bind events.
  //
  window.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    ManipulationHelper.perform(data.name, data.content);
  }, true);
  window.addEventListener("keydown", (event) => {
    ManipulationHelper.perform('keydown', event.keyCode);
  }, false);
  window.addEventListener("click", (event) => {
    EditorHelper.synchronize("click", null);
  }, false);
  window.document.body.addEventListener("click", (event) => {
    if (EventHelper.checkIfDenyForEarlyHandle(event)) return;
    
    EditorHelper.moveCursorToTheEndOfDocument();
    EditorHelper.synchronize("click", null);
    
  }, true);
  
  // Install capabilities.
  //
  EditorHelper.installCapabilitiesForInternalElements(document);
})();