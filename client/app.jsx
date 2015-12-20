App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
      return {
        activites: Activities.find({}).fetch()
      }
  },
  reducer: function (key) {
    return function (arr) {
      return _.reduce(arr, (result, a) => {
        result += a[key]
        return result
      }, 0)
    }
  },
  mapData: function () {
    if (!this.data.activites)  { return [] };
    return _.chain(this.data.activites)
      .map(d => { return d.activity })
      .groupBy(activity => { return activity.cat})
      .map((arr, cat) => {
        console.log(this.reducer('score')(arr))
        return { cat: cat, totalScore: this.reducer('score')(arr),
         pleasure:this.reducer('pleasure')(arr),
         achievement:this.reducer('achievement')(arr)
     }
      })
      .value()
  },
  render: function() {
    console.log('app form data', this.data)
    return (
      <div>
        <div className="p-header" >
            <div className="nav-wrapper">
          <img src="http://www.clker.com/cliparts/F/N/l/r/i/v/scale.svg"/>     <span id = "title">BALANCE</span> <img src="http://www.clker.com/cliparts/F/N/l/r/i/v/scale.svg"/>
            </div>
        </div>
      <div className="container" style= {{width:'25%', float:'left'}}>
        <div className="row">
            <ActivityForm  style={{display:'inline-block'}}/>
              <ActivityList data={this.data.activites} style={{display:'inline-block'}}/>
          </div>
       </div>
        <div id = "labels">
          <p style = {{color:"rgb(42,57,61)"}}>Social</p>
          <p style = {{color:"rgb(124,90,51)"}}>Recreation</p>
          <p style = {{color:"rgb(124,53,51)"}}>Wellbeing</p>
          <p style = {{color:"rgb(52,61,36)"}}>Daily</p>
          <p style = {{color:"rgb(37,107,142)"}}>Work</p>
        </div>
          <div className="paper">
            <CircleChart data={this.mapData()} width="500" height="500"/>
          </div>

      </div>

    );
  }
});