import React from 'react';
import './Avatar.scss';
import generateAvatarFromHash from "../Helper/generateAvatarFromHash";
import classnames from 'classnames';




let Avatar = ({user, id, small = false})=>{

        if(user.avatar){
                return <img  src={user.avatar} alt={`avatar ${user.fullName}`}/>
        }else{
                let{color,colorLighten} = generateAvatarFromHash(id);
                let firstChar = user.fullname[0].toLocaleUpperCase();

                return <div
                    style={{background: `linear-gradient(135deg,${color} 0%, ${colorLighten} 96.52%)`}}
                    className={classnames('avatar',{'small': small})}  >
                        {firstChar}
                </div>
        }


}

export default Avatar;