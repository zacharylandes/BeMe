BarsChart = React.createClass({
  componentDidMount: function() {
      var el = ReactDOM.findDOMNode(this);
      var svg = d3.select(el)
          .append("svg")
          .attr("width", this.props.width)
          .attr("height", this.props.height);
          this.updateChart(this.props);
  },
  componentWillUpdate: function(nextProps) {
      this.updateChart(nextProps);
  },
  render: function() {
        return (
          <div>
          <div className="rect"></div>
          <div className="rect1"></div>
          </div>
        );
  },
  updateChart: function(props) {
   var data = props.data;
   var t_achievement=0;
   var t_pleasure=0;
   for (var i=0;i<=4;i++){
   t_achievement+=data[i].achievement;
   t_pleasure+=data[i].pleasure;}
  console.log(data,t_achievement,t_pleasure)
    var svg = d3.select("svg");
    var bars = svg.selectAll("rect")
            .data(t_achievement);
    var bars1 = svg.selectAll("rect1")
            .data(t_pleasure);
  bars.enter()
    .append("rect")
    .attr("fill", "orange")
    .attr("x", 20)
    .attr("y", 20)
    .attr("height",20)
    .attr("width", 100);

  bars.transition()
    .duration(2000)
    .attr("fill", "yellow")
    .attr("x", 50)
    .attr("y", 150)
    .attr("height", 20)
    .attr("width", t_achievement);

  bars1.enter()
    .append("rect1")
    .attr("fill", "black")
    .attr("x", 20)
    .attr("y", 20)
    .attr("height",20)
    .attr("width", 100);


  bars1.transition()
    .duration(2000)
    .attr("fill", "black")
    .attr("x", 50)
    .attr("y", 250)
    .attr("height", 20)
    .attr("width", t_pleasure);

  bars.exit()
          .remove();

  bars1.exit()
          .remove();

}

});
