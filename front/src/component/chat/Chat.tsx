import React from 'react'
import { Rooms } from './Rooms/Rooms';
import { UserContent } from './UserContent';
import { ChatContent } from './ChatContent';
import useRooms from './ChatStore/useRooms';
import Style from './Rooms/styleRoom.module.css'
import OtherRooms from './OtherRooms/OtherRooms';
import { ChannelForm } from './form/ChannelForm';
import useNewchannelCreate from './ChatStore/useNewChannelCreate';
import { DmsList } from './DMs/DmsList';
import { RoomSettings } from './Rooms/RoomSettings';
import useDisplayRoomSettings from './ChatStore/useDisplayRoomSettings';
import { DefaultRoomsContent } from './Rooms/DefaultRoomsContent';
import { DefaultChatContent } from './DefaultChatContent';



export const Chat = () => {
  const {joinedRooms, updateCurrentRooms} = useRooms();
  const {On} = useDisplayRoomSettings();
  console.log(joinedRooms)
  const style1: string = "bg-[#457B9D] text-[white]";
  const style2: string = "text-[#457B9D]  bg-[#A8DADC]";
  let style3: string =  "w-[50%] h-[80%]  text-[0.7vw] rounded-[2vw]  ";
  let style4: string = "w-[50%] h-[80%]  text-[0.7vw] rounded-[2vw]  ";
  
  const {addNewChannel} = useNewchannelCreate();

  if (joinedRooms)
  {
    
    style3 += style1;
    style4 += style2;
  }
  else
  {
    
    style3 += style2;
    style4 += style1;    
  }



  return (
    
    <div className={"flex flex-row justify-center items-center w-[100%] h-[44vw]"}>
        
        <div className={"w-[40%] h-[100%] pb-[1vw]  flex flex-col justify-center items-center gap-[1.5vw]"}>   
          <DmsList/>
          <div className={"flex flex-col w-[100%] h-[50%] justify-center items-center gap-[0.5vw] "}>
            <div className={"w-[40%] h-[10%] bg-[#A8DADC] rounded-[2vw] flex justify-between pl-[0.1vw] pr-[0.1vw] items-center "}>
              <button onClick={() => updateCurrentRooms(false)} className={[Style.font3, style4].join(" ")}>{"Other Rooms"}</button>
              <button onClick={() => updateCurrentRooms(true)} className={[Style.font3,  style3].join(" ")}>{"Your Rooms"}</button>
            </div>
              {(joinedRooms && <Rooms/>) || ( !joinedRooms && <OtherRooms/>)}
              {/* <DefaultRoomsContent/> */}
             
          </div>
        </div>

        <div className={"w-[60%] h-[100%] p-[2vw] flex flex-col  "}>
            <UserContent/>
            <ChatContent/>
            {/* <DefaultChatContent/> */}
        </div>
        
        {addNewChannel && <ChannelForm/> }
        {On && <RoomSettings/>}
        
    </div> 
  )
}

export default Chat;