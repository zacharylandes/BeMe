CircleChart = React.createClass({
  //prepping svg
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
  //getting balance variable which is the ratio of pleasure to achievement
  // getBalance: function(){
  // var data = props.data;

  //   return balance;
  // },
  //drawing circles
  updateChart: function(props) {
   var data = props.data;
      for (var i= 0;i<=4;i++){
     var t_achievement= 0;
     var t_pleasure= 0;
     var balance = 0;
     t_achievement += data[i].achievement;
     t_pleasure += data[i].pleasure;
     balance = (t_pleasure/t_achievement);
   }
  //ordering values to avoid overlapping circles
       data = data.sort(function(a,b) {
      return(b.totalScore - a.totalScore)
      });

      console.log('data in  circlechart', data)
      d3.selectAll("svg > *").remove();
  var svg = d3.select("svg");
  var text = svg.selectAll("text")
     .data(data)
     .enter()
     .append("text");

  var scale = d3.scale.linear()
      .domain([0,300])
      .range([0,100]);

  var circle = svg.selectAll("circle")
        .data(data);
  circle.enter()
        .append("circle")
        .style("fill", function(d,i) {
          if(d.cat==='Social'){return "rgb(42,57,61)"}
          else if(d.cat==='Recreation'){return "rgb(124,90,51)"}
          else if(d.cat==='Wellbeing'){return 'rgb(124,53,51)'}
          else if(d.cat==='Daily'){return "rgb(52,61,36)"}
          else {return "rgb(37,107,142)"}
          })
     .attr("r", function(d,i) {return scale(d.totalScore/2)})
     .attr("cx", function(d,i){return ((i-(i*.86))*100)+500})
     .attr("cy", function(d,i){return ((i-(i*.86))*100)+400});



  // textLabels.transition()
  //         .duration(3000)
  //         .attr("x", 200)
  //         .attr("y", function(d,i) {
  //            return (i+1)*50
  //          });
      // circle.transition()
      //  .duration(1000)
      //  .attr("r", function(d,i) {
      //         if(i===0){ return 100 }
      //         else if(i===1){ return 200 }
      //         else if(i===2){ return 300 }
      //         else if(i===3){ return 400 }
      //         else { return 500 }
      //       })
      //  .attr("cx", 400)
      //  .attr("cy", 400);

  circle.transition()
     .duration(2000)
     .attr("r", function(d,i) {return scale(d.totalScore)})
     .attr("cx", function(d,i){return ((i-(i*.56))*100)+500})
     .attr("cy", function(d,i){return ((i-(i*.56))*100)+400});
    circle.exit()
        .remove();


}

});
