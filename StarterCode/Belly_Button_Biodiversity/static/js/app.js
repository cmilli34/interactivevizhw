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
      
      console.log("hello");
      
      var sample_metadata = d3.select("#sample-metadata");	
        
      sample_metadata.html("");
  
    Object.entries(sample).forEach(function ([key,value]) {
      var row = sample_metadata.append("tr");
      row.text(`${key}: ${value}`);
   });
  });
       }
  
  function buildCharts(sample) {
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
      
      var second_dataset = `/samples/${sample}`;
      console.log(sample);
      console.log(second_dataset);

      
      d3.json(second_dataset).then(function(data) {
      
  // @TODO: Build a Bubble Chart using the sample data
       
     var x = second_dataset.otu_ids;
     var y = second_dataset.sample_values;
     var bubble_mark_size = second_dataset.sample_values;
     var bubble_mark = second_dataset.otu_ids;
     var text = second_dataset.otu_labels;
       
     var bubble_data = {
      type: "bubble",
      mode: "markers",
      x: x,
      y: y,
      text: text,
      marker: {
        color: bubble_mark,
        size: bubble_mark_size,
       }
   };
       
     var chart_1 = [bubble_data]; 
            
       var bubble_layout = {
         xaxis: { title: "Bubble Chart" },
   };
      
   Plotly.newPlot("bubble", chart_1, bubble_layout);
      
  });
       
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  
      d3.json(second_dataset).then(function(data) {
    
      var pie_value = data.sample_values.slice(0,10);
      var pie_label = data.otu_ids.slice(0,10);
      var pie_hover= data.otu_labels.slice(0,10);
  
      console.log(pie_value);
      console.log(pie_label);
      console.log(pie_hover);
  
    var pie_data = [{
      value: pie_value,
      labels: pie_label,
      text: pie_hover,
      type: "pie",
  }];
        
      var pie_layout = {
        height: 600,
         width: 600,
    };
    
    Plotly.newPlot("pie", pie_data, pie_layout);
          
    });
  }
  
  
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
