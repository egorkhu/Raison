import React from 'react'

export const HeadCell = ({name, sort, triangle}) => (
    <th
        key={name}
        scope="col"
        onClick={sort}
        role="button"
        className="col"
    >
        { name }
        { triangle === undefined
            ? null
            : triangle === true
                ? <span className="mx-1">&#9650;</span>
                : <span className="mx-1">&#9660;</span>
        }
    </th>
)