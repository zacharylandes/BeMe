BarChart = React.createClass({

  componentDidMount: function() {
      var el = ReactDOM.findDOMNode(this); // This is de div we are rendering
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
          <div className="chart"></div>
        );
  },
  updateChart: function(props) {
      var data = props.data;

      console.log('data in  barchart', data)


      var max = _.max(_.pluck(data, "totalScore"));
      console.log(max)
        var color = d3.scale.linear()
                    .domain([0,max])
                    .range(['cyan','black']);

      var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, props.width], 0.05);

      var svg = d3.select("svg");

      var circle = svg.selectAll("circle")
        .data(data)
      //  .sort(function (a, b) { return a.totalScore - b.totalScore })


      circle.enter()
          .append("circle")
          .attr("fill", (d) => color(d.totalScore))
          .attr("r", function(d, i) {
            return d.totalScore/2
          })
          .attr("cx",200)
          .attr("cy", 200)


      // bars.transition()
      //   .duration(1000)



    // circle.transition()
    //     .duration(1000)
    //
    //       .attr("cx", xScale.rangeBand())
    //       .attr("cy", function(d, i) {
    //         return yScale(d.totalScore)
    //       });

      circle.exit()
          .remove();
function getRandomColor(brightness){
    //6 levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
  }


      circle.exit()
          .remove();
        }

    //   var qtyLabel = svg.selectAll(".qtyLabel").data(data);
    //   qtyLabel.enter()
    //       .append("text")
    //       .attr("class", "qtyLabel")
    //       .style("font-weight", "bold")
    //       .attr("text-anchor", "middle")

    //   qtyLabel.transition()
    //     .duration(1000)
    //   .attr("x", function(d, i) {
    //     return xScale(i) + xScale.rangeBand()/2;
    //   })
    //   .attr("y", function(d, i) {
    //     return props.height - yScale(d.totalScore) - 25
    //   })
    //   .text(function(d, i) {
    //     return d.cat;
    //   });

    //   var xLabel = svg.selectAll(".xLabel").data(data);
    //   xLabel.enter()
    //       .append("text")
    //       .attr("class", "xLabel")

    //   xLabel.text(function(d, i) {
    //         return d.xLabel;
    //       })
    //       .attr("text-anchor", "middle")
    //       .attr("x", function(d, i) {
    //         return xScale(i) + xScale.rangeBand()/2;
    //       })
    //       .attr("y", function(d, i) {
    //         return props.height - 5;
    //       });
    // },



});

