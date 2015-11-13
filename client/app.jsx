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
    if (!this.data.activites)  { return [] }
    return _.chain(this.data.activites)
      .map(d => { return d.activity })
      .groupBy(activity => { return activity.cat })
      // .each(activity => { console.log(activity)})
      .map((arr, cat) => {

        return { cat: cat, totalScore: this.reducer('score')(arr)  }
      })
      .value()
  },

  render: function() {

    console.log('data', this.data)


    return (
      <div>
        <div className="page-header">
          <center>
            <h1>
            <img src = "noun_12489"/> Actividados
      </h1>
          </center>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ActivityForm />
              <ActivityList data={this.data.activites}/>
          </div>
          <div className="col-md-offset-2 col-md-6">
            <BarChart data={this.mapData()} width="1480" height="1320"/>
          </div>

          <div className="col-md-offset-2 col-md-6">
          </div>
        </div>
      </div>
      </div>
    );
  }
});
