import React from 'react'
import userImage from './../../assets/images/userImage.jpg'

function UserInfo() {
    return (
        <div className="flex flex-row items-center">
            <p className="text-black font-semibold text-base leading-4 text-right">
                De Freitas, Manuel <br />
                <span className="text-gray-400 font-normal text-sm">Digital Publisher</span>
            </p>
            <div className="flex w-10 ml-2 rounded-full overflow-hidden">
                <img alt="user" src={userImage} />
            </div>
        </div>
    ) 
}

export default UserInfo
