import React, { FunctionComponent, SyntheticEvent } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { parentPort } from 'worker_threads';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import classes from '*.module.css';

// TODO: Create class that contains classes setup

export function MenuDropdown (props: any) {
  let label: string = props.label || "dropdown";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const useStyles = makeStyles({
    root: {
      zIndex: 1,
    },
  });
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    if (!props.active) {
      console.log('closing ', label, ' because inactive')
      setOpen(false);
    }

    prevOpen.current = open;
  }, [open, props.active]);

  const handleInteraction = (e: React.MouseEvent) => {
    props.onClick(e)
    setOpen(!open)
  }

  /**
   * Check if user is interacted with menu dropdown
   */
  const handleActiveDropdown = () => {
    if (props.reveal) {
      props.setActive(label)
      setOpen(true)
    }
  }

  return (
    <div
      className={classes.root}
    >
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleInteraction}
        onMouseEnter={handleActiveDropdown}
      >
        {label}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const MenuSection: FunctionComponent<any> = (props: any) => {
  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
      width: '100%',
    },
  });
  const classes = useStyles();
  return (
    <Grid item sm={4} className={classes.root}>
      <Grid container spacing={0}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export function MenuBar () {
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [revealDropdown, setRevealDropdown] = React.useState(false); // reveal, active, expose, interacting
  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
      width: '100%',
      zIndex: 1,
    },
  });
  const classes = useStyles();

  const setActiveDropdownMenu = (e: React.MouseEvent) => {
    e.persist()
    setRevealDropdown(!revealDropdown)
    setActiveDropdown(e.target.innerText)
  }

  // If all menus have closed, setRevealDropdown to false

  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
      >
        <MenuSection>
          <MenuDropdown
            label="FILE"
            active={activeDropdown === "FILE"}
            setActive={setActiveDropdown}
            reveal={revealDropdown}
            setReveal={setRevealDropdown}
            onClick={(e: React.MouseEvent) => setActiveDropdownMenu(e)}
          />
          <MenuDropdown
            label="EDIT"
            active={activeDropdown === "EDIT"}
            setActive={setActiveDropdown}
            reveal={revealDropdown}
            setReveal={setRevealDropdown}
            onClick={(e: React.MouseEvent) => setActiveDropdownMenu(e)}
          />
          <MenuDropdown
            label="VIEW"
            active={activeDropdown === "VIEW"}
            setActive={setActiveDropdown}
            reveal={revealDropdown}
            setReveal={setRevealDropdown}
            onClick={(e: React.MouseEvent) => setActiveDropdownMenu(e)}
          />
        </MenuSection>
        <MenuSection />
        <MenuSection />
      </Grid>
    </Grid>
  );
}
