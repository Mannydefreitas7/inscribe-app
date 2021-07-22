import React, { useContext } from 'react';
import { ReactSVG } from 'react-svg';
import AssetPicker from './AssetPicker';
import Components  from './Components';
import HeaderTitle from './HeaderTitle';
import CloseIcon from './../assets/icons/close.svg';
import { GlobalContext } from '../store/GlobalState';
export default function AddView() {

    const { closeModal} = useContext(GlobalContext)

    return (
        <div>
            <HeaderTitle title="Add">
                <button
                    onClick={() => closeModal()}
                    className="p-2 hover:bg-gray-900 rounded">
                    <ReactSVG src={CloseIcon} />
                </button>
            </HeaderTitle>
            <div className="overscroll-contain">
                <AssetPicker />
                <Components />
            </div>
        </div>
    )
}
