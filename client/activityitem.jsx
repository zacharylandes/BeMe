ActivityItem = React.createClass({

  render: function() {
   var act = this.props.activity.activity.name
   var cat = this.props.activity.activity.cat
   var score = this.props.activity.activity.score
    return (
    <div>
       <ol>Activity:{act}</ol>
    </div>
    );
  }
})