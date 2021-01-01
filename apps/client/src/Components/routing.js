import React, { useEffect, useState } from "react";
import {
    Switch,
    Route,
    useHistory,
} from "react-router-dom";


import Home from "./Home";
import Singin from "./Singin";
import Singup from "./Singup";
import Profile from "./Profile";
import Logout from "./logout"
import Userprofile from "./usersprofile"
import Uploadprofile from "./uploadprofile"
import Createpost from "./CreatePost";

import Viewpost from "./viewpost"
import viewpost from "./viewpost";



const Routing = () => {

    const [users, setusers] = useState("")

    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {

           // history.push("/");
            setusers(user)
        } else {
            history.push("/singin");
        }
    }, []);

    return (
        <>
            {
                users ? <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/createpost" component={Createpost} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/users/:id" component={Userprofile} />
                    <Route exact path="/updateprofile" component={Uploadprofile} />
                    <Route exact path="/post/:id" component={viewpost} />


                </Switch> :
                    <Switch>
                        <Route exact path="/singin" component={Singin} />
                        <Route exact path="/singup" component={Singup} />
                    </Switch>
            }
        </>

    );
};



export default Routing