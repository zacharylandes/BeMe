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

            <h1> <img src="http://www.clker.com/cliparts/F/N/l/r/i/v/scale.svg"/> Balance <img src="http://www.clker.com/cliparts/F/N/l/r/i/v/scale.svg"/> </h1>

            </div>
        </div>
      <div className="container" style= {{width:'25%', float:'left', display:'inline-block'}}>
        <div className="row">
            <ActivityForm  style={{display:'inline-block'}}/>
              <ActivityList data={this.data.activites} style={{display:'inline-block'}}/>
          </div>
       </div>
          <div className="paper">
            <CircleChart data={this.mapData()} width="500" height="500"/>
          </div>

      </div>

    );
  }
});