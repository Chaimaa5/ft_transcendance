import React from 'react'

import Style from "../Rooms/styleRoom.module.css"
import { OtherRoom } from './OtherRoom'

export default function OtherRooms() {
  const rooms = [1, 2, 3, 5, 6, 7, 8,9,1,2,3,4,5,6,7, 8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7]

  return (
    <div className={"flex flex-col w-[100%] h-[90%] justify-center items-center   "}>






      <div className={[Style.frame, "  w-[100%] h-[100%] rounded-[1.5vw]  bg-gradient-to-br from-[#1D3557] to-[#0F294F]  overflow-y-auto overflow-x-hidden"].join(" ")}>
        {rooms.map(e => <OtherRoom/>)}
      </div>
    </div>
  )
}
