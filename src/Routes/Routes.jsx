import React from 'react'
import { Route, Switch } from "react-router-dom";
import { EditStudent } from '../components/EditStudent';
import { StudentList } from '../components/StudentList';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <StudentList />
            </Route>
            <Route path="/:id">
                <EditStudent />
            </Route>
        </Switch>
    )
}
