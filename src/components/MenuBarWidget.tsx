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
import _ from 'lodash';

// TODO: Create class that contains classes setup

export function MenuDropdown (props: any) {
  let label: string = props.label || "dropdown";

  const useStyles = makeStyles({
    root: {
      zIndex: 1,
    },
  });
  const classes = useStyles();

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
    props.setDpState({
      ...props.dpState,
      [label]: false
    })
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      console.log('handleListKeyDown')
      setOpen(false);
    }
  }

  React.useEffect(() => {
    console.log('MenuDropdown useEffect')
    setOpen(props.active)
  }, [props.active]);

  const handleInteraction = (e: React.MouseEvent) => {
    props.onClick(e)
    setOpen(!open)
  }

  /**
   * Check if user is interacted with menu dropdown
   */
  const handleActiveDropdown = () => {
    const dropdownActivated = Object.values(props.dpState).some(active => active === true)
    if (dropdownActivated) {
      const newDpState = _.mapValues(props.dpState, () => false);
      setOpen(true)
      props.setDpState({
        ...newDpState,
        [label]: true
      })
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

interface DropdownState {
  [key: string]: Boolean;
 } 
export function MenuBar () {
  const [dpState, setDpState] = React.useState<DropdownState>({
    "FILE": false,
    "EDIT": false,
    "VIEW": false,
  });

  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
      width: '100%',
      zIndex: 1,
    },
  });
  const classes = useStyles();

  const closeDropdowns = () => {
    // Set other dropdowns to close
    const newDpState = _.mapValues(dpState, () => false);
    setDpState(newDpState)
  }

  /**
   * Resets dropdown state before toggling a dropdown
   */
  const toggleDropdown = (e: React.MouseEvent) => {
    e.persist()
    let dropdownName = e.target.innerText

    // Set other dropdowns to close
    closeDropdowns()

    // Set active dropdown to open
    setDpState({
      ...dpState,
      [dropdownName]: !dpState[dropdownName]
    })
  }

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
          {/* TODO LOOP MENU OPTIONS AND SUBOPTIONS */}
          <MenuDropdown
            label="FILE"
            active={dpState.FILE}
            dpState={dpState}
            setDpState={setDpState}
            closeDropdowns={closeDropdowns}
            onClick={(e: React.MouseEvent) => toggleDropdown(e)}
          />
          <MenuDropdown
            label="EDIT"
            active={dpState.EDIT}
            dpState={dpState}
            setDpState={setDpState}
            closeDropdowns={closeDropdowns}
            onClick={(e: React.MouseEvent) => toggleDropdown(e)}
          />
          <MenuDropdown
            label="VIEW"
            active={dpState.VIEW}
            dpState={dpState}
            setDpState={setDpState}
            closeDropdowns={closeDropdowns}
            onClick={(e: React.MouseEvent) => toggleDropdown(e)}
          />
        </MenuSection>
        <MenuSection />
        <MenuSection />
      </Grid>
    </Grid>
  );
}
