import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { parentPort } from 'worker_threads';

type DefaultProps = { 
  children?: any,
  name?: string
 };

export namespace TopMenu {
  export const SimpleMenu = (props: DefaultProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="top-menu-btn">
          {props.name}
        </Button>
        <Menu
          id="file-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>action1</MenuItem>
        </Menu>
      </div>
    );
  }

  /**
   * Section of the top menu bar
   */
  export const BarSection = (props: DefaultProps) => {
    const sectionStyles = makeStyles({
      root: {
        border: '1px solid black;',
        width: '100%',
      },
    });
		const menuSectionStyles = sectionStyles();
    return (
      <Grid item sm={4} className={menuSectionStyles.root}>
        <Grid container spacing={0}>
          {props.children}
        </Grid>
      </Grid>
    );
  }

	/**
   * Whole top menu bar
   */
	export const Bar = () => {
    const barStyles = makeStyles({
      root: {
        border: '1px solid black;',
        width: '100%',
      },
    });
    const menuBarStyles = barStyles();
		return <Grid
			container
			direction="row"
			justify="space-between"
			alignItems="stretch"
			className={menuBarStyles.root}
		>
			<BarSection name="left">
        <SimpleMenu name="file"/>
        <SimpleMenu name="edit"/>
        <SimpleMenu name="view"/>
      </BarSection>
			<BarSection />
			<BarSection />
		</Grid>;
  }
}

export class TopMenuBar extends React.Component<DefaultProps> {
	render() {
		return (
      <Grid item xs={12}>
        <TopMenu.Bar />
      </Grid>
		);
	}
}
