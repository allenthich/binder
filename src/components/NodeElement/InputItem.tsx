import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

type JsonData = string | number | Array<any> | Object;

export interface TextInputProps {
	modelType?: any;
	color?: string;
	name?: string;
  background?: string;
  data: JsonData;
  key: string | number;
}

export const TextInput = (props: TextInputProps) => {
  const [value, setValue] = useState(props.data);
  const [key, setKey] = useState(props.key);

  const useStyles = makeStyles({
    // Style rule
    root: (p: { color: string; background: string; }) => ({
      backgroundColor: p.background,
      padding: '5px',
      margin: '10px',
      border: `solid 1px ${(p: TextInputProps) => p.color}`,
      marginBottom: '2px',
      cursor: 'pointer'
    }),
  });
  
  const classes = useStyles({
    color: 'rgba(255,255,255, 0.05)',
    background: '',
  });

  const handleChange = (event: any) => {
    setValue(event.target.value);
  }

  return (
    <form className={classes.root}>
      <label>
        {/* <input type="text" value={value} onChange={handleChange} /> */}
        <TextField id="outlined-basic" label={key} variant='outlined' defaultValue={value} />
      </label>
      {/* <input type="submit" value="Submit" /> */}
    </form>
  );
}