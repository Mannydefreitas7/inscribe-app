import React, { useContext } from 'react'
import Nestable from 'react-nestable'
import { GlobalContext } from '../../store/GlobalState';
import Collaspible from '../Collaspible'
import OutlineCollapsible from '../OutlineCollapsible';
import ArrowDown from './../../assets/icons/arrow-down.svg';

function ArticleOutline() {

    const { article, loadArticle } = useContext(GlobalContext);

    return (
        <div>
             {
                article && article.items.length > 0 ? <Collaspible title="Outline">
               
                    {
                        article && article.items.length > 0 ? 
                        <Nestable
                            items={article.items}
                            collapsed={true}
                            maxDepth={4}
                            onChange={({items}) => {
                                article.items = items
                                loadArticle(article)
                            }}
                            renderCollapseIcon={(collapseIcon) => <img src={ArrowDown} alt="" style={{  
                                width: 24,
                                transform: `rotate(${ !collapseIcon.isCollapsed ? '0' : '90' }deg)`,
                                transition: 'transform .3s'
                            }} />}
                            renderItem={({item, collapseIcon}) => <OutlineCollapsible item={item} icon={collapseIcon} />}
                      /> : null
                    }

                </Collaspible> : null
            }
        </div>
    )
}

export default ArticleOutline
