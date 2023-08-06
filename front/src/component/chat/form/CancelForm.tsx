import React from 'react'
import cancel_icon from '../../tools/btnsIcons/cancelIcon.svg' 
import { ReactSVG } from 'react-svg'
import useNewchannelCreate from '../ChatStore/useNewChannelCreate'

export const CancelForm = () => {
    const {updateAddNewChannel} = useNewchannelCreate();

  return (
    <button onClick={() => updateAddNewChannel(false)} className=" absolute top-[0.7vw] right-[0.7vw] w-[1.4vw] rounded-full bg-[#E63946] h-[1.4vw]  flex justify-center items-center ">
        <ReactSVG className={ "w-[0.7vw]"} src={cancel_icon}/>
    </button>      
  )
}
