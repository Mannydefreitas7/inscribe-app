import React from 'react'

function DragDropIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
  <defs>
    <clipPath id="clipPath">
      <rect id="Rectangle_667" data-name="Rectangle 667" width="32" height="32" fill="none"/>
    </clipPath>
  </defs>
  <g id="window-pop-out" transform="translate(12 12)">
    <g id="Group_433" data-name="Group 433" transform="translate(-12 -12)" clip-path="url(#clipPath)">
      <path id="Path_272" data-name="Path 272" d="M15.5,14a.5.5,0,0,0-.5.5V21H2V10h8.5a.5.5,0,0,0,0-1h-9a.5.5,0,0,0-.5.5v12a.5.5,0,0,0,.5.5h14a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5" fill={props.fill}/>
      <path id="Path_273" data-name="Path 273" d="M22.5,2H8.5a.5.5,0,0,0-.5.5v5a.5.5,0,0,0,1,0V3H22V14H17.5a.5.5,0,0,0,0,1h5a.5.5,0,0,0,.5-.5V2.5a.5.5,0,0,0-.5-.5" fill={props.fill}/>
      <path id="Path_274" data-name="Path 274" d="M15.1,9.1,9,15.3V12.5a.5.5,0,0,0-1,0v4a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,0-1H9.7l6.1-6.1a.5.5,0,0,0-.7-.7" fill={props.fill}/>
    </g>
  </g>
</svg>

    )
}

export default DragDropIcon
