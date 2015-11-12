
ActivityList = React.createClass({

    renderActivities() {
    return this.props.data.map((activity) => {
      return <ActivityItem activity={activity} />;
    });
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">History
          <small> click to remove</small>
          </h3>
        </div>
        <div className="panel-body">
          <ul>
            {this.renderActivities()}
          </ul>
        </div>
      </div>
    );
  }
})
