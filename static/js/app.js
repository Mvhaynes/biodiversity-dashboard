// Default chart
function init() {
    
    d3.json("../samples.json").then(function(sampleData) {
        
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

init();


function getData(filterID) {

    d3.json("../samples.json").then((sampleData) => {
        
        // Access data and assign to variables 
        var names = [sampleData].map(data => data.names);
        var metadata = [sampleData].map(data => data.metadata);
        var samples = [sampleData].map(data => data.samples);
       
        // Get filtered data values 
        var filterData = samples[0].filter(item => item.id == filterID)[0];
        var sampleID = filterData.id;
        var otuLabels = filterData.otu_labels;
        var sampleValues = filterData.sample_values;
        var otuID = filterData.otu_ids;
        var idLabels = otuID.map(otuID => {return "OTU #" + otuID}) 

        // Build bar chart  
        data = [{
            x: sampleValues.slice(0,10),
            y: idLabels.slice(0,10),
            text: otuLabels.slice(0,10),
            type: 'bar', 
            orientation: 'h'
        }]
        // Format chart 
        var layout = {
            title: "Top 10 OTUs in Subject " + filterID,
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU ID"}
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
                size: sampleValues
            }
        }]
        
        bubbleLayout = {
            title: "bubble"
        }
        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
};

function getMetadata(filterID) {

    var metadataPanel = d3.select("#sample-metadata"); // Select panel 
    metadataPanel.text(""); // Clear current panel 

    // Get metadata 
    d3.json("../samples.json").then(function(sampleData) {
        
        // Filter by ID 
        var metadata = [sampleData].map(data => data.metadata)[0];
        var filteredMetadata = metadata.filter(item => item.id == filterID)[0];
        
        // Add data to panel 
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            metadataPanel.append("h4").text(`${key}: ${value}`);
          });
    });
};

// Updates when dropdown is changed 
function optionChanged(filterID) {
    getData(filterID);
    getMetadata(filterID);
}
