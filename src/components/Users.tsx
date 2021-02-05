import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import IUsers from '../interfaces/users';

interface IUser {
    id: number,
    dateCreated: string,
    email: string,
    emailProvider: string
}

interface IEmailProviders {
    [index: string]: string
}

const Users: React.FC = () => {

    const [usersData, setUsersData] = useState<IUser[]>([]);
    const [providers, setProviders] = useState<IEmailProviders[]>([]);
    const [page, setPage] = React.useState(1);
    const [orderBy, setOrderBy] = useState('dateCreated');
    const [filter, setFilter] = useState('none');

    const [previousPage, setPreviousPage] = useState();
    const [totalPages, setTotalPages] = useState([]);
    const [nextPage, setNextPage] = useState(2);

    const getUsers = (page: number, orderBy: string, filter: string) => {
        setPage(page);
        setOrderBy(orderBy);
        setFilter(filter);

        axios.get(`http://localhost/mb-backend/api/users?page=${page}&orderBy=${orderBy}&filterBy=${filter}`)
            .then(res => {
                setUsersData(res.data.userData)
                setPreviousPage(res.data.previousPage)
                setNextPage(res.data.nextPage)
                setProviders(res.data.providers)
                setTotalPages(res.data.totalPages)

                console.log(res.data.providers)
            })
            .catch(err => {
                console.log(err);
            })

    }

    const deleteUser = (id: number) => {
        axios.delete(`http://localhost/mb-backend/api/delete?id=${id}`)
            .then(res => {
                alert('Deleted')
                getUsers(page, orderBy, filter)
            })
    }

    useEffect(() => {
        getUsers(page, orderBy, filter)
    }, [])

    return (
        <section id="users">
            <div>
                <span>Order by: </span><button onClick={() => getUsers(page, 'email', filter)}>Email</button><button onClick={() => getUsers(page, 'dateCreated', filter)}>Date created</button>
            </div>
            <div>
                <span>Filter by: </span>
                {
                    providers.map((p, index) => (
                        <button onClick={() => getUsers(page, orderBy, p.emailProvider)}>{p.emailProvider}</button>
                    ))
                }
                <button onClick={() => getUsers(page, orderBy, 'none')}>Clear filter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <td>Date created</td>
                        <td>Email</td>
                        <td>Email provider</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map(user => (
                        <tr key={user.id}>
                            <td>{user.dateCreated}</td>
                            <td>{user.email}</td>
                            <td>{user.emailProvider}</td>
                            <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                {
                    previousPage
                    ? <button onClick={() => getUsers(page - 1, orderBy, filter)}>Previous</button>
                    : <button disabled>Previous</button>
                }

                {
                    totalPages.map(p => (
                        <button onClick={() => getUsers(p, orderBy, filter)}>{p}</button>
                    ))
                }

                {
                    nextPage
                    ? <button onClick={() => getUsers(page + 1, orderBy, filter)}>Next</button>
                    : <button disabled>Next</button>
                }
            </div>
        </section>
    );
}

export default Users;