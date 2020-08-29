import React from 'react';
import * as _ from 'lodash';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export const Accordion = (props: any) => {
  const classes = useStyles();
  const createAccordionItem = (child: any) => {
    return (
      <MuiAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>props.type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {child}
        </AccordionDetails>
      </MuiAccordion>
    )
  }
  return (
    <div className={classes.root}>
      {_.map(props.children, createAccordionItem)}
    </div>
  );
}
