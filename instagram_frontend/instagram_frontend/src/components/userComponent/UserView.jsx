import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile';
import ProfileList from './ProfileList';

class UserView extends Component {
    state = {
        currentMenu : "suggestions",
        listForProfileList : []
    }
    componentDidMount(){
        //api => suggestions
    }

    updateCurrentMenu(cMenu){
        console.log(cMenu);
        // this.setState({currentMenu:cMenu});
        let isFollowers = cMenu == 'followers';
        if(isFollowers){
            axios.get("/api/v1/user/request/addid")
            .then((res)=>{
                //all followers
                let allFollowers = res.data.message;
                //remove request
                let myFollowers = allFollowers.filter(follower => follower.is_accepted ==  1);
                //for all followers we will go to there user table
                let followersDetailsPArray = myFollowers.map((follower)=>{
                    return axios.get(`/api/v1/user/${follower.follower_id}`)
                })
                return Promise.all(followersDetailsPArray);
            }).then((followerDetailsResponseArray)=>{
                let listForProfileList = [];
                for(let i = 0; i < followerDetailsResponseArray.length;i++){
                    let {handle,name,uid} = followerDetailsResponseArray[i].data.user;
                    listForProfileList.push({handle,name,uid});
                }
                this.setState({
                    listForProfileList:listForProfileList,
                    currentMenu:cMenu
                })
                
            })
        }

    }

    render() { 
        let {listForProfileList} = this.state;
        return (
            <React.Fragment>
            <div className="user-view">
                <Profile updatecurrentMenu={this.updatecurrentMenu}></Profile>
                <ProfileList listForProfileList={listForProfileList}></ProfileList>
            </div>
        </React.Fragment>
        );
    }
}
 
export default UserView;