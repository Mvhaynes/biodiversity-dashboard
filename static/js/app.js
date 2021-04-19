// Default chart
function init() {
    
    d3.json("../samples.json").then(function(sampleData) {
        
        var names = [sampleData].map(data => data.names);
        var metadata = [sampleData].map(data => data.metadata);
        var samples = [sampleData].map(data => data.samples);

        var otuID = samples[0][0].otu_ids.slice(0,10); // Get top 10 IDs for first sample
        var xLabel = otuID.map(id => {return "OTU #" + id}); // Converts ID to string and adds "OTU"
        var sampleValues = samples[0][0].sample_values.slice(0,10); // Get top 10 sample values 
        var otuLabels = samples[0][0].otu_labels;

        // Create dropdown options  
        names[0].forEach(function(id) {
            var dropdownMenu = d3.select("#selDataset"); // Select the dropdown menu ID 
            dropdownMenu.append("option").text(id).property("value"); // Add each name to the dropdown options
            });
        
        var defaultID = samples[0][0].id;
        getData(defaultID);
    })};



        
        // Plotly.newPlot("bar", data, layout);

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

function optionChanged(filterID) {
    getData(filterID);
}
