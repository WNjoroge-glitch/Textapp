import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import { Home } from "./pages/Home";
import {SignIn} from './pages/SignIn';
import { SignUp } from "./pages/SignUp";
import { Admin } from "./pages/Admin";
import {Message} from './pages/Message';
import { Report} from "./pages/Report";
import {Sent} from './pages/Sent'
import { Contact } from "./pages/Contact";
import {Draft} from './pages/Draft'
import { PrivateRoute} from "./auth/PrivateRoute";
import { DraftMessage } from "./pages/DraftMessage";
import { AddContact } from "./pages/AddContact";
import { Template } from "./pages/Template";
import {Profile} from './pages/Profile'
import BulkMessages from "./pages/BulkMessages";
import Whatsapp from "./pages/Whatsapp";





export const RoutePath = () => {
    
   
   

    
   

    
 
    return (
         <Router>
            <Switch> 
                <PrivateRoute exact path="/">
                    <Home/>
                </PrivateRoute>
                <PrivateRoute path="/admin">
                    <Admin/>
                </PrivateRoute>
                <PrivateRoute path="/report">
                    <Report/>
                </PrivateRoute>
                <PrivateRoute path="/drafts">
                    <Draft/>
                </PrivateRoute>
                <PrivateRoute path="/sent">
                    <Sent/>
                </PrivateRoute>
                <PrivateRoute path="/contacts">
                    <Contact/>
                </PrivateRoute>
                <PrivateRoute exact path="/send-sms">
                    <Message/>
                </PrivateRoute>
                <PrivateRoute exact path="/send-whatsapp">
                    <Whatsapp/>
                </PrivateRoute>
                <PrivateRoute exact path="/write-message">
                 <Message/>
                 </PrivateRoute>
                <PrivateRoute exact path="/write-message/:id">
                 <DraftMessage/>
                 </PrivateRoute>
                <PrivateRoute path="/add-draft">
                    <Message/>
                </PrivateRoute>
                <PrivateRoute path="/add-contact">
                 <AddContact/>
                 </PrivateRoute>
                 <PrivateRoute path="/template">
                 <Template/>
                 </PrivateRoute>
                 <PrivateRoute path="/profile">
                 <Profile/>
                 </PrivateRoute>
                 <PrivateRoute path="/user/profile">
                 <Profile/>
                 </PrivateRoute>
                <Route path="/signin">
                <SignIn/>
                </Route>
                <PrivateRoute path="/import-messages">
                    <BulkMessages/>
                </PrivateRoute>
                <PrivateRoute path ="/signup">
                    <SignUp/>
                </PrivateRoute>
                
 {/* <Route exact path="/" >
     {loggedIn  ? <Home/> : <SignIn/>
     </Route>
                  
               
                               
                 <Route path ="/admin">
                 {loggedIn ? <Admin/> : <SignIn/>}
                    
                 </Route>
                 <Route path ="/report" >
                 {loggedIn ? <Report/> : <SignIn/>}
                 </Route>
                 <Route path ="/sent">
                 {loggedIn ? <Sent/> : <SignIn/>}
                 </Route>
                 <Route path ="/contacts">
                 {loggedIn ? <Contact/> : <SignIn/>}
                     </Route>
                 <Route path ="/write-message">
                 {loggedIn ? <Message/> : <SignIn/>}
                 </Route>
                 <Route path ="/drafts">
                 {loggedIn ? <Draft/> : <SignIn/>}
                 </Route>
                 <Route path="/write-message/:id">
                 {loggedIn ? <DraftMessage/> : <SignIn/>}
                 </Route>
                 <Route path="/add-contact">
                 {loggedIn ? <AddContact/> : <SignIn/>}
                 </Route>
                 <Route path="/template">
                 {loggedIn ? <Template/> : <SignIn/>}
                 </Route>
                 <Route path="/profile">
                 {loggedIn ? <Profile/> : <SignIn/>}
                 </Route>
                 <Route path="/user/profile">
                 {loggedIn ? <Profile/> : <SignIn/>}
                 </Route>
                 <Route path ="/signin">
                 {loggedIn ? <Redirect to="/"/> : <SignIn/>}
                </Route>
                <Route path ="/signup">
                    <SignUp/>
                    </Route> */}
                 </Switch>
        </Router>
       
    
    )
    
}

