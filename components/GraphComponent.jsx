import React, { useState, useEffect } from 'react'
import { Graph } from 'react-d3-graph'
import { myConfig } from 'config/config.js'
import { Link } from 'components'
import { prepareData } from 'utils'
import { isJsonString } from 'utils'
import { UpdateButton } from 'components'

export const GraphComponent = graph => {
    const { id, json } = graph
    const [preparedData, setPreparedData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!error) {
            if (isJsonString(json)) {
                setPreparedData(prepareData(JSON.parse(json)))
            } else {
                setError(true)
            }
        }
    }, [])

    return (
        <>
            <Link href={`/graphs/update/${id}`} style={{ textDecoration: 'none' }}>
                <UpdateButton variant='contained'>Update</UpdateButton>
            </Link>
            <Link href={`/graphs/`} style={{ textDecoration: 'none' }}>
                <UpdateButton variant='contained'>Back</UpdateButton>
            </Link>

            <h1 className='subTitle'>{`Graph id: ${id} `}</h1>

            {!error && (
                <div>
                    <div className='graphWrapper'>
                        <Graph id='graph-id' data={preparedData} config={myConfig} />
                    </div>

                    <div className='flexWrapper'>
                        <div className='item'>
                            <h2>Data from Server:</h2>
                            <pre className='textJSON'>{json}</pre>
                        </div>

                        <div className='item'>
                            <h2>Prepared Data:</h2>
                            <pre className='textJSON'>
                                {JSON.stringify(preparedData, undefined, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div>
                    <h1 className='subTitle'>JSON Data is incorrect</h1>
                </div>
            )}
        </>
    )
}
