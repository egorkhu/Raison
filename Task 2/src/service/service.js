export const baseFetch = async (url, params = '', type) => {
    const method = {
        method: type,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    try {
        const response =  await fetch(`${url}${params}`, method)
        return check(response)
    } catch(err) {
        throw new Error(err.message);
    }
}

const check = response => {
    if (response.status === 501) {
        throw new Error('Not Implemented')
    }
    return response
}
