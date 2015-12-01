BarChart = React.createClass({

  componentDidMount: function() {
      var el = ReactDOM.findDOMNode(this);

      // This is de div we are rendering
      var svg = d3.select(el)
          .append("svg")
          .attr("width", this.props.width)
          .attr("height", this.props.height);
      this.updateChart(this.props);
  },

    componentWillUpdate: function(nextProps) {
      this.updateChart(nextProps);
    },

  getDefaultProps: function() {
    return {
      width: 940,
      height: 880
    }
  },

  render: function() {
        return (
          <div className="circle"></div>
        );
  },
  updateChart: function(props) {
  var data = props.data;
   data = data.sort(function(a,b) {
  return(b.totalScore - a.totalScore)});

      console.log('data in  barchart', data)

      //   var color = d3.scale.linear()
      //               .domain([0,4])
      //               .range([getRandomColor(1),getRandomColor(5)]);

      // var xScale = d3.scale.ordinal()
      //   .domain(d3.range(data.length))
      //   .rangeRoundBands([0, props.width], 0.05);
      d3.selectAll("svg > *").remove();
      var svg = d3.select("svg");
      var circle = svg.selectAll("circle")
        .data(data)
      circle.enter()
          .append("circle")
          .style("fill", function(d,i) {
                      if(i===0){return "rgb(42,57,61)"}
                      else if(i===1){return "rgb(124,90,51)"}
                      else if(i===2){return "rgb(110,118,101)"}
                      else if(i===3){return "rgb(52,61,36)"}
                      else {return "rgb(37,107,142)"}
                          })
          .attr("r", function(d,i) {
            console.log(d,i)
            return 200/(i+1)

          })
          .attr("cx",100)
          .attr("cy", 100)

 var text = svg.selectAll("text")
                       .data(data)
                       .enter()
                       .append("text");

var textLabels = text
                 .attr("x", function(d,i) { return (i+1)*50 })
                 .attr("y", function(d,i) { return (i+1)*50 })
                 .text( function (d) { return d.cat; })
                 .attr("font-family", "Fugaz One")
                 .attr("font-size", "20px")
                 .attr("fill", "black");



    circle.transition()
       .duration(1000)
       .attr("cx", 200)
       .attr("cy", 200);

      circle.exit()
          .remove();
function getRandomColor(brightness){
    //6 levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
  }



}
});
