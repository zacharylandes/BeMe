ActivityItem = React.createClass({

  render: function() {
    // console.log('ActivityItem', this.props.activity.activity.name)
    var act = this.props.activity.activity.name
    var cat = this.props.activity.activity.cat
    var score = this.props.activity.activity.score

    return (
      <div>
     <li>{act}</li>
     <li>{cat}</li>
     <li>{score}</li>

      </div>

    );
  }
})