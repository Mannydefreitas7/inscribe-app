import { withStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GlobalContext } from '../store/GlobalState';
import HeaderTitle from './HeaderTitle';

const StyledMenu = withStyles({
    paper: {
     // border: '1px solid #DEDEDE',
      minWidth: 300,
      
      backgroundColor: '#F1F1F1',
       boxShadow: '3px 6px 16px #0000001c'
    },
    list: {
      paddingTop: 0,
    }
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 0,
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

export default function InsMenu(props) {
    const { isDropdownOpen, openDropdown, closeDropdown } = useContext(GlobalContext);
   // const [anchorEl, setAnchorEl] = React.useState(isDropdownOpen);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(isDropdownOpen);
    // };

    return (
       <> 
        <div onClick={openDropdown}>
             {props.children}
        </div>
        <StyledMenu
            id="customized-menu"
            anchorEl={isDropdownOpen}
            keepMounted
            open={Boolean(isDropdownOpen)}
            onClose={closeDropdown}
        >
            {/* <div className="pb-3 pt-1 px-4 border-b border-gray-100">
                <div className="text-gray-400 font-semibold">{props.title}</div>
            </div> */}
            <HeaderTitle title={props.title} />
            {
                props.items && props.items.map(item => {
                    return <StyledMenuItem 
                    disabled={item.disabled}
                    onClick={item.action}
                    key={item.id}>
                        {item.icon ? item.icon : null}
                        <div className="text-gray-600 font-medium">
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
