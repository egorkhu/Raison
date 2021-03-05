export const formatUsers = users => {
    let newUsers = []

    users.forEach(user => {
        let newUser = {}

        user.forEach(fields => {
            let mappedField = {}
            let name = null
            for (let field in fields) {
                if (field === 'field') {
                    name = fields[field]
                    mappedField[fields[field]] = {}
                } else {
                    mappedField[name] = {...mappedField[name], [field]: fields[field]}
                }
            }
            newUser = {...newUser,...mappedField, readOnly: true}
        })

        newUsers.push(newUser)
    })

    return newUsers
}

export const getColumnsNames = user => {
    const columns = []
    user.map(i => columns.push(i.field))
    return columns
}

export const checkInputs = item => {
    debugger
    for (let key in item) {
        if (item[key] === '' || item[key] === 0) return false
    }
    return true
}
