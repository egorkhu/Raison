import React, {useState} from 'react'
import {Input} from '../Input'

export const BodyRow = ({user, onDelete, onEdit, onSaveEdit}) => {
    const [name, setName] = useState(user.Name.value)
    const [age, setAge] = useState(user.Age.value)
    const [phone, setPhone] = useState(user.Phone.value)
    const [email, setEmail] = useState(user['E-mail'].value)

    return (
        <tr>
            <th scope="row">{user.ID.value}</th>
            <td>
                <Input
                    value={name}
                    readOnly={user.readOnly}
                    onChange={e => setName(e.target.value)}
                    type={user.Name.type === "string" ? "text" : "number"}
                    placeholder="Введите имя"
                    className={user.readOnly ? "border border-white text-center": "text-center"}
                />
            </td>
            <td>
                <Input
                    value={age}
                    readOnly={user.readOnly}
                    onChange={e => setAge(e.target.value)}
                    type={user.Age.type === "string" ? "text" : "number"}
                    placeholder="Введите возраст"
                    className={user.readOnly ? "border border-white text-center": "text-center"}
                />
            </td>
            <td>
                <Input
                    value={phone}
                    readOnly={user.readOnly}
                    onChange={e => setPhone(e.target.value)}
                    type={user.Phone.type === "string" ? "text" : "number"}
                    placeholder="+7 (999) 999-99-99"
                    className={user.readOnly ? "border border-white text-center": "text-center"}
                />
            </td>
            <td>
                <Input
                    value={email}
                    readOnly={user.readOnly}
                    onChange={e => setEmail(e.target.value)}
                    type={user['E-mail'].type === "string" ? "text" : "number"}
                    placeholder="Введите почту"
                    className={user.readOnly ? "border border-white text-center": "text-center"}
                />
            </td>
            <td>
                {
                    user.readOnly
                        ? (
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm mx-2"
                                onClick={onEdit}
                            >&#9998;</button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-success btn-sm mx-2"
                                onClick={() => onSaveEdit({
                                    id: user.ID.value,
                                    name: name,
                                    age: age,
                                    phone: phone,
                                    email: email
                                })}
                            >&#10003;</button>
                        )
                }
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={onDelete}
                >&#10006;</button>
            </td>
        </tr>
    )
}