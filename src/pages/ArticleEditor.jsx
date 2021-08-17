import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../store/GlobalState'

function ArticleEditor() {

    const { changeWorkspace } = useContext(GlobalContext)

    useEffect(() => {
        changeWorkspace('article')
    }, [])

    return (
        <>
            
        </>
    )
}
export default ArticleEditor
