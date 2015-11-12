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
      width: 640,
      height: 480
    }
  },

  render: function() {
        return (
          <div className="chart"></div>
        );
  },
  updateChart: function(props) {
      var data = props.data;


      var max = _.max(_.pluck(data, "qty"));
      var yScale = d3.scale.linear()
        .domain([max,0])
        .range([0, props.height - 35]);
      // var color = d3.scale.linear()
      //               .domain([0,20])
      //               .range(['green','purple']);
        var color = d3.scale.linear()
                    .domain([0,60])
                    .range([getRandomColor(3),getRandomColor(5)]);

      var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, props.width], 0.05);

      var svg = d3.select("svg");

      var circle = svg.selectAll("circle").data(data);
      circle.enter()
          .append("circle")
          // .attr("fill", function(d){return color(d.qty)});
          .attr("fill", (d) => color(d.qty));

      // bars.transition()
      //   .duration(1000)
      //   .attr("r", function(d, i) {
      //       return xScale(i);
      //     })
      //     .attr("cx", xScale.rangeBand())
      //     .attr("cy", function(d, i) {
      //       return yScale(d.qty)
      //     });


    circle.transition()
        .duration(1000)
           .attr("r", function(d, i) {
            return props.height - yScale(d.qty) - 20;
          })
          .attr("cx", xScale.rangeBand())
          .attr("cy", function(d, i) {
            return yScale(d.qty)
          });

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

      var qtyLabel = svg.selectAll(".qtyLabel").data(data);
      qtyLabel.enter()
          .append("text")
          .attr("class", "qtyLabel")
          .style("font-weight", "bold")
          .attr("text-anchor", "middle")

      qtyLabel.transition()
        .duration(1000)
      .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand()/2;
      })
      .attr("y", function(d, i) {
        return props.height - yScale(d.qty) - 25
      })
      .text(function(d, i) {
        return d.qty;
      });

      var xLabel = svg.selectAll(".xLabel").data(data);
      xLabel.enter()
          .append("text")
          .attr("class", "xLabel")

      xLabel.text(function(d, i) {
            return d.xLabel;
          })
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand()/2;
          })
          .attr("y", function(d, i) {
            return props.height - 5;
          });
    },



});

