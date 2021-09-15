import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'
import Collaspible from './Collaspible';
import moreIcon from './../assets/icons/more.svg';
import { useHistory } from 'react-router-dom';


export default function TOCView() {

const { presentation } = useContext(GlobalContext);
const history = useHistory();
    return (
        <div>
            <Collaspible title="Table of Contents" >
                {
                    presentation && presentation.toc.map((article, index) => {
                        return <div key={index} className="flex justify-between  items-center p-2 border-b-2 border-gray-50 hover:bg-gray-100 rounded hover:bg-opacity-30 my-1" onClick={() => history.push('/editor?articleId=' + article.id)}>
                        <div className="inline-flex items-center">
                            <div className="leading-3">
                                 <span className="font-normal text-sm text-gray-600">{article.title}</span>
                               <br />
                                <span className="font-normal text-xs text-gray-400">{article.index} - Article</span>
                            </div>
                        </div>
            
                        <div className="flex content-center">
                            <img src={moreIcon} width="24" className="mr-2" alt="" />
                        </div>
                    </div>
                    })
                }
            </Collaspible>
        </div>
    )
}
