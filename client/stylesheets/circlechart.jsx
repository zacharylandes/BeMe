CircleChart = React.createClass({
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
          <div className="circle"></div>
        );
  },
  updateChart: function(props) {
   var data = props.data;
      data = data.sort(function(a,b) {
      return(a.totalScore - b.totalScore)
      });
   var t_achievement=0;
   var t_pleasure=0;
   var balance= 0;
   for (var i=0;i<=4;i++){
   t_achievement+=data[i].achievement;
   t_pleasure+=data[i].pleasure;
   balance=(t_pleasure/t_achievement);
    }
  console.log(data,t_achievement,t_pleasure,  balance)
      console.log('data in  circlechart', data)
      // d3.selectAll("svg > *").remove();
  var svg = d3.select("svg");

  var circle = svg.selectAll("circle")
        .data(data);
  circle.enter()
      .append("circle")
      .style("fill", function(d,i) {
        if(d.cat==='Social'){return "rgb(42,57,61)"}
        else if(d.cat==='Recreation'){return "rgb(124,90,51)"}
        else if(d.cat==='Wellbeing'){return '#7c3533'}
        else if(d.cat==='Daily'){return "rgb(52,61,36)"}
        else {return "rgb(37,107,142)"}
  })
    .attr("r", function(d,i) {
        console.log(d,i)
        if(i===4){return 160}
        else if(i===3){return 130}
        else if(i===2){return 120}
        else if(i===1){return 110}
        else {return 90}
    })
     .attr("cx", function(d,i) {
      return 10/(i+1)*20
    })
    .attr("cy", 100);

  circle.transition()
     .duration(2000)
     .attr("r", function(d,i) {
          console.log(d,i)
          if(i===4){return 40}
          else if(i===3){return 70}
          else if(i===2){return 100}
          else if(i===1){return 130}
          else {return 160}
        })
     .attr("cx", function(d,i){return ((i-(i*.83))*100)+300})
     .attr("cy", function(d,i){return ((i-(i*.83))*100)+300});
    circle.exit()
        .remove();


}

});
