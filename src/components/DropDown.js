import { withStyles } from '@material-ui/core';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #DEDEDE',
      minWidth: 300,
      backgroundColor: '#F1F1F1',
       boxShadow: '3px 6px 16px #0000001c'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: '20px',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
        color: '#707070',
        fontFamily: 'inherit',
    },
  }))(MenuItem);

export default function DropDown(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
       <> 
        <div onClick={handleClick}>
             {props.children}
        </div>
        <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <div className="pb-3 pt-1 px-4 border-b border-gray-100">
                <div className="text-gray-400 font-semibold">Project</div>
            </div>
            {
                props.items && props.items.map(item => {
                    return <StyledMenuItem 
                    disabled={item.disabled}
                    onClick={item.action}
                    key={item.id}>
                        {item.icon ? item.icon : null}
                        <div className="text-gray-600 font-semibold">
                            {item.text}<br />
                            {item.description ? <span className="text-sm font-normal text-gray-300">{item.description}</span> : null}
                        </div>
                    </StyledMenuItem>
                    })
            }
      </StyledMenu>
        </>
    )
}
