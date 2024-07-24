// crops to contents of the layer and saves to a folder

if (app.documents.length > 0) {
  // check for an active open document
  var originalDoc = app.activeDocument;
  var originalPath = originalDoc.path;

  /*
        The script loops through all layers in the active document.
        It only processes layers that are of type "ArtLayer" and not background layers.
    */
  for (var i = 0; i < originalDoc.layers.length; i++) {
    var layer = originalDoc.layers[i];
    if (layer.typename == "ArtLayer" && layer.isBackgroundLayer == false) {
      /*
            For each eligible layer, it copies the layer, 
            creates a new document with the same dimensions and resolution as the original
            and pastes the layer into this new document. 
            The trim function removes any transparent pixels around the layer content.
        */
      layer.copy();
      var newDoc = app.documents.add(
        originalDoc.width,
        originalDoc.height,
        originalDoc.resolution,
        layer.name,
        NewDocumentMode.RGB,
        DocumentFill.TRANSPARENT
      );
      newDoc.paste();
      newDoc.trim(TrimType.TRANSPARENT, true, true, true, true);

      /*
            The script then saves the new document as a PSD file named after the layer, 
            Finally, it closes the new document without saving changes.
        */

      var saveFile = File(originalPath + "/" + layer.name + ".psd");
      var psdOptions = new PhotoshopSaveOptions();
      psdOptions.layers = true;
      newDoc.saveAs(saveFile, psdOptions, true, Extension.LOWERCASE);
      newDoc.close(SaveOptions.DONOTSAVECHANGES);
    }
  }
} else {
  alert("No document open!");
}
