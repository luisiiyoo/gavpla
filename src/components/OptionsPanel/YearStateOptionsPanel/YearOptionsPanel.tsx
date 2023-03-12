import React from "react";
import Select, { StylesConfig } from 'react-select';


const fontSize = "x-large"
const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' , color:'black', fontSize, height: "inherited"}),
    option: (styles) => ({ ...styles, backgroundColor: 'white' , color:'black', fontSize}),
    // input: (styles) => ({ ...styles, height: "10%",}),
  };
  

const style: React.CSSProperties = {
    // borderStyle: 'double',
    
    // justifyContent: 'center',
    // marginTop: "1%",
    // marginBottom:"1.5%",
    width: '50%',
    display: "flex",
    justifyContent: "center",
    verticalAlign: 'top',
    textAlign: 'center',
}
const options = [
    { value: '68-69', label: '68-69' },
    { value: '70-71', label: '70-71' },
    { value: '72-73', label: '72-73' }
    // { value: '68-69', label: '1968-1969' },
    // { value: '70-71', label: '1970-1971' },
    // { value: '72-73', label: '1972-1973' }
  ]

export interface YearOptionsPanel{

}    



export const YearOptionsPanel = ({}:YearOptionsPanel) => {
    return (
        <div className="YearOptionsPanel" style={style}>
            <label style={{fontSize}}>{"Year:"}</label>
            <Select 
            options={options} 
            isClearable isLoading={false} 
            styles={colourStyles}
            // value={""}
            />
        </div>
    )
}
