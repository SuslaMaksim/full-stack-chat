import React from 'react';
import './Block.scss';

let Block = (props)=>{

    return(
        <div className='block'>{props.children}</div>

    )
}

export default Block;