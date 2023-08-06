import React from "react";
import Avatar from "../avatar";
import { ReactSVG } from "react-svg";
import av from "../tools/profile.png"
import icon4 from "../tools/btnsIcons/6.svg"


const BlockList = () => {
    return(
        <>
            <div className="h-[10%] w-[100%]  p-[2%]">
                <h2 className="text-[#A8DADC] text-[1vw] text-center">Blocked Accounts</h2>
            </div>
            <div className="w-[100%] p-[1%] h-[90%] flex justify-start items-center flex-col">
                <div className="w-[60%] h-[14%] p-[3%] rounded-[2vw] border-[0.1vw] border-[#A8DADC] flex justify-between items-center">
                    <Avatar src={av} wd_="2.5vw"/>
                    <h1 className="text-[#A8DADC] text-[1vw]">mmoutawa</h1>
                    <button className="h-[1.5vw] w-[1.5vw] flex items-center justify-center bg-[#E63946] rounded-[50%]">
                        <ReactSVG src={icon4} className="w-[0.6vw] "/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default BlockList