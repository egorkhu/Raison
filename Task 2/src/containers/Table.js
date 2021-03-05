import React, {useEffect, useReducer} from 'react'
import {baseFetch} from '../service/service'
import {checkInputs, formatUsers, getColumnsNames} from '../utils/Utils'
import {HeadCell} from '../components/Table/HeadCell'
import {BodyRow} from '../components/Table/BodyRow'
import {Alert} from '../components/Alert'

const initialState = {
    data: [],
    users: [],
    columns: [],
    isLoading: false,
    sort: {},
    message: {text: '', type: '', isShown: false}
}
const reducer = (state, action) => {
    return {...state, ...action };
}

export const Table = () => {
    const [state, setState] = useReducer(reducer, initialState)
    const url=`https://frontend-test.netbox.ru`

    useEffect(() => {
        const fetchUsers = async url => {
            try {
                loading()

                const response = await baseFetch(url)
                const data = await response.json()

                setState({
                    data,
                    isLoading: false,
                    columns: getColumnsNames(data[0])
                })
            } catch(err) {
                showError(err)
            }
        }

        fetchUsers(url, 'GET')
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.data.length !== 0) {
            setState({users: formatUsers(state.data)})
        }
    }, [state.data])

    const loading = () => {
        setState({isLoading: !state.isLoading})
    }

    const sort = id => {
        let sort = {...state.sort}

        if (sort.hasOwnProperty(id)) {
            sort[id] = !sort[id]
        } else {
            sort = {}
            sort[id] = true
        }
        setState({sort})

        const sorted = state.users.sort((a, b) => {
            if (sort[id]) {
                if (a[id].value > b[id].value) {
                    return - 1
                } else {
                    return 1
                }
            } else {
                if (a[id].value < b[id].value) {
                    return - 1
                } else {
                    return 1
                }
            }
        })
        setState({users: sorted})
    }

    const addRowHandler = async () => {
        try {
            const obj = {
                Age: {value: 0, type: "integer"},
                'E-mail': {value: "", type: "string"},
                ID: {value: state.users.length + 1, type: "integer"},
                Name: {value: "", type: "string"},
                Phone: {value: "", type: "string"},
                readOnly: false
            }

            const response = await baseFetch(
                url,
                `?method=add&name=${obj.Name.value}&age=${obj.Age.value}&phone=${obj.Phone.value}&email=${obj['E-mail'].value}`,
                'POST'
            )

            if (response.ok) {
                let users = [...state.users]
                users.push(obj)

                setState({users})
            }
        } catch(err) {
            showError(err)
        }
    }

    const editRowHandler = id => {
        const users = [...state.users]
        users.forEach(user => {
            if (user.ID.value === id) {
                user.readOnly = false
            }
        })
        setState({users})
    }

    const saveEditRowHandler = async item => {
        if (!checkInputs(item)) {
             return showWarning('Не все поля заполнены')
        }

        try {
            const response = await baseFetch(
                url,
                `?method=update&id=${item.id}&name=${item.name}&age=${item.age}&phone=${item.phone}&email=${item.email}`,
                'POST'
            )

            if (response.ok) {
                const users = [...state.users]

                users.forEach(user => {
                    if (user.ID.value === item.id) {
                        user.Name.value = item.name
                        user.Age.value = item.age
                        user.Phone.value = item.phone
                        user['E-mail'].value = item.email
                        user.readOnly = true
                    }
                })
                setState({users})
            }
        } catch(err) {
            showError(err)
        }
    }

    const deleteRowHandler = async id => {
        try {
            const response = await baseFetch(url, `?method=delete&id=${id}`, 'POST')
            if (response.ok) {
                deleteItem(id)
            }
        } catch(err) {
            console.log(err.message)
            showError(err)
        }
    }

    const deleteItem = id => {
        let users = [...state.users]
        users = users.filter(user => user.ID.value !== id)
        setState({users})
    }

    const showError = err => {
        const message = {
            text: err.message,
            type: 'danger',
            isShown: true
        }
        setState({message})
    }

    const showWarning = msg => {
        const message = {
            text: msg,
            type: 'warning',
            isShown: true
        }
        setState({message})
    }

    const closeAlertHandler = () => {
        setState({message: {text: '', type: '', isShown: false}})
    }

    return (
        <div className="container p-5">
            {
                state.message.isShown
                    ? <Alert
                        message={state.message.text}
                        type={state.message.type}
                        onClose={closeAlertHandler}
                    />
                    : null

            }
            <h2 className="mb-5">Пользователи</h2>
            <div className="row">
                <div className="col">
                    {
                        state.isLoading
                            ? <p className="text-center">Загрузка...</p>
                            : <table className="table">
                                <thead>
                                <tr>
                                    {
                                        state.columns?.map(name => (
                                                <HeadCell
                                                    key={name}
                                                    name={name}
                                                    sort={() => sort(name)}
                                                    triangle={state.sort[name]}
                                                />
                                            )
                                        )

                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    state.users.length === 0
                                        ? <tr><td className="text-center p-5" colSpan="5">Пользователей не найдено</td></tr>
                                        : state.users.map((user) => {
                                            return (
                                                <BodyRow
                                                    key={user.Phone.value + user['E-mail'].value}
                                                    user={user}
                                                    onSaveEdit={saveEditRowHandler}
                                                    onEdit={() => editRowHandler(user.ID.value)}
                                                    onDelete={() => deleteRowHandler(user.ID.value)}
                                                />
                                            )
                                        })
                                }
                                </tbody>
                            </table>
                    }
                    <button
                        className="btn text-secondary mt-1 mb-2"
                        onClick={addRowHandler}
                    >+ ДОБАВИТЬ СТРОКУ</button>
                    {
                        !state.isLoading && (
                            <h6 className="text-end">Общее количество пользователей: {state.users.length}</h6>
                        )
                    }
                </div>
            </div>
        </div>
    )
}