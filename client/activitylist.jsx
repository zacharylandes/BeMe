ActivityList = React.createClass({

    renderActivities() {
    return this.props.data.map((activity) => {
      return <ul className= "collection-item">< ActivityItem activity={activity} /></ul>
    });
  },
  render: function() {
    return (
      <div className="collection">
        <div >
          <h3 >Your Activities
          </h3>
        </div>
        <div >
          <ul key= {this.props.data.id}>
          {this.renderActivities()}
          </ul>
        </div>
      </div>
    );
  }
})