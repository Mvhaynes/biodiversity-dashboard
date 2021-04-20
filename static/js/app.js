// Default chart
function init() {
    
    d3.json("data/samples.json").then(function(sampleData) {
        
        // Get ids 
        var names = [sampleData].map(data => data.names);

        // Create dropdown options  
        names[0].forEach(function(id) {
            var dropdownMenu = d3.select("#selDataset"); // Select the dropdown menu ID 
            dropdownMenu.append("option").text(id).property("value"); // Add each name to the dropdown options
            });

        // Create default chart 
        var defaultID = names[0][0];
        getData(defaultID);
        getMetadata(defaultID);
    })};

// Get data based on filter ID from dropdown menu 
function getData(filterID) {

    d3.json("data/samples.json").then((sampleData) => {
        
        // Get sample data
        var samples = [sampleData].map(data => data.samples);
       
        // Get filtered data values 
        var filterData = samples[0].filter(item => item.id == filterID)[0];
        var otuLabels = filterData.otu_labels;
        var sampleValues = filterData.sample_values;
        var otuID = filterData.otu_ids;
        var idLabels = otuID.map(otuID => {
            return "OTU #" + otuID
        }); 

        // Build bar chart  
        data = [{
            x: sampleValues.slice(0,10),
            y: idLabels.slice(0,10),
            text: otuLabels.slice(0,10),
            type: 'bar', 
            orientation: 'h',
            marker: {
                color: 'rgb(255, 65, 54)',
                opacity: 0.6}
        }]

        // Format chart 
        var layout = {
            title: "Top 10 OTUs in Subject " + filterID,
            xaxis: {title: "Sample Values"}
        };

        Plotly.newPlot("bar", data, layout);

        // Build bubble plot 
        bubbleData = [{
            x: otuID,
            y: sampleValues,
            text: idLabels,
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: otuID,
                size: sampleValues,
                opacity: 0.6
            }
        }]

        // Format bubble plot
        bubbleLayout = {
            title: "OTU Sample Values",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Value'}
        }
        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
};

function getMetadata(filterID) {
    var metadataPanel = d3.select("#sample-metadata"); // Select panel 
    metadataPanel.text(""); // Clear current panel 

    // Get metadata 
    d3.json("data/samples.json").then(function(sampleData) {
        
        // Filter by ID 
        var metadata = [sampleData].map(data => data.metadata)[0];
        var filteredMetadata = metadata.filter(item => item.id == filterID)[0];
        
        // Add data to panel 
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            metadataPanel.append("h6").text(`${key}: ${value}`);
          });

        // Plot metadata 
        var data = [
            {
              domain: { 
                  x: [0, 1], 
                  y: [0, 1] },
              value: filteredMetadata.wfreq,
              title: { 
                  text: "Washing Frequency (/week)" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { 
                    range: [0, 7]},
                bar: { color: "white" },
                steps: [
                  { range: [0, 1], color: "red"},
                  { range: [1, 2], color: "rgb(255, 102, 102)"},
                  { range: [2, 3], color: "rgb(255, 153, 51)"},
                  { range: [3, 4], color: "rgb(255, 178, 102)"},
                  { range: [4, 5], color: "rgb(255, 255, 51)"},
                  { range: [5, 6], color: "rgb(102, 204, 0)"},
                  { range: [6, 7], color: "green"}]
              }}];
        
          Plotly.newPlot('gauge', data);

    });
};

// Updates when dropdown is changed 
function optionChanged(filterID) {
    getData(filterID);
    getMetadata(filterID);
}

init();