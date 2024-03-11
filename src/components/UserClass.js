//class component

import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // this.state={
    //     count:0,
    // };
    //const [count] =useState(0) in functgonal component

    this.state = {
      userInfo: {
        name: "dummy",
        location: "Dummy",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch(
      "https://api.github.com/users/vijay-krishna-chauhan"
    );
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    console.log(json);
  }

  render() {
    const {blog}=this.state.userInfo;
    return (
      <div className="userClass">
        <div className="userClass-img">
          <img src={this.state.userInfo.avatar_url} className="avatar"></img>
        </div>
        <div className="userClass-info">
          <h1>Name: {this.state.userInfo.name}</h1>
          <h3>Location: {this.state.userInfo.location}</h3>
          <h3>Website: <a href={blog}>{blog}</a></h3>
        </div>
        {/* <h1>Count: {this.state.count}</h1> */}
        {/* <button onClick={()=>{
                    this.setState({
                        count:this.state.count+1
                    })
                }}>
                    Increase count
                </button> */}
      </div>
    );
  }
}

export default UserClass;
