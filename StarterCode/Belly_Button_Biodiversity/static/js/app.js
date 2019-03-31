function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  
  // Use `d3.json` to fetch the metadata for a sample
    
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
    // Use d3 to select the panel with id of `#sample-metadata`
      //	var sample_metedata = document.getElementById("#sample-metadata");
  
  // Use `.html("") to clear any existing metadata
    //Use variable from above, attach to .html("")	
      
      var default_url = `/metadata/${sample}`;
      d3.json(default_url).then(function(sample) {
       //console.log("hello"); 
      var sample_metadata = d3.select("#sample-metadata");	
        
      sample_metadata.html("");
  
      Object.entries(sample).forEach(function ([key,value]) {
      var row = sample_metadata.append("tr");
      row.text(`${key}: ${value}`);
   });
  });
       }
  
  function buildCharts(sample) {
  

  
  
  function init() {
    var selector = d3.select("#selDataset");

    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      const firstSample = sampleNames[0];
  
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }

  init();
