//setting up react component
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
    var data = props.data.sort(function(a,b) {
        return(a.totalScore - b.totalScore)
       });
    console.log(this.data.currentUser)
      d3.selectAll("svg > *").remove();
  var svg = d3.select("svg");
  var circle = svg.selectAll("circle")
        .data(data);
//rendering circle with standard size and color
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
         if(i===4){return 40}
        else if(i===3){return 70}
        else if(i===2){return 100}
        else if(i===1){return 130}
        else {return 160}
    })
      .attr("cx", 100)
      .attr("cy", 100);
//circle animation
  circle.transition()
     .duration(2000)
     .attr("cx", 250)
     .attr("cy", 250);

//getting ratio of achievement to pleasure to find var balance
 var t_achievement=0;
 var t_pleasure=0;
 var balance= 0;
  for (var i=0;i<=4;i++){
       t_achievement+=data[i].achievement;
       t_pleasure+=data[i].pleasure;
       balance=(t_pleasure/t_achievement);
  }
 var text = svg.selectAll("text")
   .data(data)
   .enter()
   .append("text");
//rendering text to describe user's balance
    if(balance>1){
      var textLabels = text
           .attr("x",30)
           .attr("y",300)
           .text(function(){ return "You have a bit of a pleasure surplus!"})
           .attr("font-family", "Fugaz One")
           .attr("font-size", "1.2em")
           .attr("fill", "#393d42");
      }
    else{
      var textLabels = text
           .attr("x",30)
           .attr("y",300)
           .text(function(){ return "You have a bit of an achievement surplus!"})
           .attr("font-family", "Fugaz One")
           .attr("font-size", "1.2em")
           .attr("fill", "#393d42");
      }
    textLabels.transition()
        .duration(3000)
        .attr("x", 30)
        .attr("y", 100);
//moving the location of the circles to portray the user's balance
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
   .attr("cx", function(d,i){return ((i-(i*balance))*200)+300})
   .attr("cy", function(d,i){return ((i-(i))*200)+300});
    circle.exit()
        .remove();
   }
});
