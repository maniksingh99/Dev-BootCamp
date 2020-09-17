import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    state = {
        src : "",
        handle : "",
        name : "...",
        noOfPost : "",
        followersCount : "",
        followingCount : ""
    }
    componentDidMount(){
        axios.get("api/v1/user/973ffade-98e1-4d48-84dd-bc16ad300745")
        .then((res)=>{
            console.log(res);
            let {handle,name} = res.data.user;
            this.setState({handle:handle,name});
        })
        // .then(()=>{
        //     return axios.get("api/v1/user/request/addid");
        // })
        // .then((res)=>{
        //     let followers = res.data.message.filter((follower)=> follower.is_accepted == 1);
        //     console.log(followers);
        //     this.setState({followersCount:followers.length});
        // })
        .catch(function (err){
             console.log(err);
        })
    }
    render() { 
        let {src,handle,name,noOfPost,followersCount,followingCount} = this.state;
        let {updateCurrentMenu} = this.props;
        return (
            <React.Fragment>
                <div className = "profile-parent">
                    <div className = "profile">
                        <div className="profile-details">
                            <img src = {src} alt = "profile_img"></img>
                            <p>{name}</p>
                            <p>{handle}</p>
                        </div>
                        <div className="profile-status">
                            <div className="stat">
                                <div className="post">{noOfPost}</div> 
                                <div>Post</div>
                            </div>
                            <div className="stat">
                                <div className="followers">{followersCount}</div>
                                <div>Followers</div>
                            </div>
                        
                            <div className="stat">
                                <div className="following">{followingCount}</div>
                                <div>Following</div>
                            </div>
                            <div className="menu">
                                <div className="menu-list">
                                    <div onClick={() => { updateCurrentMenu("suggestion"); }}>Suggestion </div>
                                    <div onClick={() => { updateCurrentMenu("request"); }}>Request </div>
                                    <div onClick={() => { updateCurrentMenu("followers"); }}>Followers</div>
                                    <div onClick={() => { updateCurrentMenu("following"); }}>Following`</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default Profile;