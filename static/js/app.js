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
        var otuLabels = filterData.otu_labels.slice(0,10);
        var sampleValues = filterData.sample_values.slice(0,10);
        var otuID = filterData.otu_ids.slice(0,10);
        var idLabels = otuID.map(otuID => {return "OTU #" + otuID}) 

        // Build chart 
        data = [{
            x: sampleValues,
            y: idLabels,
            text: otuLabels,
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
    })
};

function getMetadata(filterID) {

    var metadataPanel = d3.select("#sample-metadata"); // Select panel 
    metadataPanel.text(""); // Clear current panel 

    // Get metadata 
    d3.json("../samples.json").then(function(sampleData) {
        
        // var names = [sampleData].map(data => data.names);
        var metadata = [sampleData].map(data => data.metadata)[0];
        // var samples = [sampleData].map(data => data.samples);

        var filteredMetadata = metadata.filter(item => item.id == filterID)[0];
        var ethnicity = filteredMetadata.ethnicity;
        var gender = filteredMetadata.gender;
        var age = filteredMetadata.age;
        var location = filteredMetadata.location;
        var bbtype = filteredMetadata.bbtype;
        var wfreq = filteredMetadata.wfreq;
        
        // Add data to panel 
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            metadataPanel.append("h4").text(`${key}: ${value}`);
          });
    });
};

    

function optionChanged(filterID) {
    getData(filterID);
    getMetadata(filterID);
}
