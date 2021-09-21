import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../store/GlobalState'

function ArticleEditor() {

    const { changeWorkspace } = useContext(GlobalContext)

    useEffect(() => {
        changeWorkspace('article')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            
        </>
    )
}
export default ArticleEditor
