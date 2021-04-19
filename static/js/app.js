
d3.json("../samples.json").then(function(sampleData) {

    // Access data and assign to variables 
  var names = [sampleData].map(data => data.names);
  var metadata = [sampleData].map(data => data.metadata);
  var samples = [sampleData].map(data => data.samples);

  // Default chart
  function init() {
      var otuID = samples[0][0].otu_ids.slice(0,10); // Get top 10 IDs for first sample
      var xLabel = otuID.map(id => {return "OTU #" + id}); // Converts ID to string and adds "OTU"
      var sampleValues = samples[0][0].sample_values.slice(0,10); // Get top 10 sample values 
      var otuLabels = samples[0][0].otu_labels;
      
      // Compile data values
      var data = [{
          x: sampleValues,
          y: xLabel, 
          text: otuLabels,
          type: 'bar',
          orientation: 'h'
      }];

      // Format chart 
      var layout = {
          title: "Top 10 OTUs in Subject 940",
          xaxis: {title: "Sample Values"},
          yaxis: {title: "OTU ID"}
      };
      
      Plotly.newPlot("bar", data, layout);
  }

  init();
  
  // Create dropdown options  
  names[0].forEach(function(id) {
    var dropdownMenu = d3.select("#selDataset"); // Select the dropdown menu ID 
    dropdownMenu.append("option").text(id).property("value"); // Add each name to the dropdown options
    });


    function getData(filterID) {
        
        // Get filtered data values 
        var filterData = samples[0].filter(item => item.id == filterID)[0];
        var sampleID = filterData.id;
        var otuLabels = filterData.otu_labels.slice(0,10);
        var sampleValues = filterData.sample_values.slice(0,10);
        var otuID = filterData.otu_ids;
        var idLabels = otuID.map(id => {return "OTU #" + otuID})

        // Update plot
        data = [{
            x: sampleValues,
            y: otuLabels,
            text: idLabels
        }];
        layout = {
            title: "Top 10 OTUs in Subject " + filterID
        }

        Plotly.restyle("bar", data, layout);
    }
});

