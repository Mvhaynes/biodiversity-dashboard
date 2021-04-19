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
      
      var data = [{
          x: sampleValues,
          y: xLabel, 
          text: samples[0][0].otu_labels,
          type: 'bar',
          orientation: 'h'
      }];

      var layout = {
          title: "Top 10 OTUs in Subject 940",
          xaxis: {title: "Sample Values"},
          yaxis: {title: "OTU ID"}
      };
      Plotly.newPlot("bar", data, layout);
  }
  
  init();

//   console.log(names);
//   console.log(metadata);
//   console.log(samples);
//   console.log(samples[0][0].id); //accessing sample data 
  
  // Create dropdown options  
  names[0].forEach(function(id) {
    
    // Select the dropdown menu ID 
    var dropdownMenu = d3.select("#selDataset");

    // Add each name to the dropdown options 
    dropdownMenu.append("option").text(id).property("value");
    });

    // d3.select("#selDataset").property("value").on("change", updateChart);

   // Update plot based on filter 
//    function updateChart(filterID) {
//        data = [{
//            x: filterID,
//            y: y,
//            type: 'bar'
//        }]
//        Plotly.restyle("bar",data);
//    }

//    function optionChanged(filterID) {
//        updateChart(filterID);
//    }


  // Horizontal bar chart (id v sample values)
  var sampleValues = samples[0].map(function(sample) {
      var sampleID = sample.id; //access using sample.key
      var sampleValue = sample.sample_values;
      var sampleLabels = sample.otu_labels;
      var otuID = sample.otu_ids;
      
      function makeChart(xAxis, yAxis) {
          data = [{
              x: xAxis,
              y: yAxis,
              type: 'bar'
          }]
      };

  

    


  })

});



// // metadata 
// var ethnicity = data.metadata.ethnicity;
// var gender = data.metadata.gender;
// var age = data.metadata.age;
// var location = data.metadata.location;
// var bbType = data.metadata.bbtype;
// var wfreq = data.metadata.wfreq;

// // OTU data 
// var sampleID = data.samples;
// var otuID = data.samples[0].otu_ids
// var sampleValues = data.samples[0].sample_values;
// var otuLabels = data.samples[0].otu_labels;
// console.log(otuID);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart