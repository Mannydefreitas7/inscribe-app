import React, { useContext, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import Components  from './../extensions/Components';
import HeaderTitle from './HeaderTitle';
import CloseIcon from './../../assets/icons/close.svg';
import { GlobalContext } from './../../store/GlobalState';
export default function AddView() {

    const { closeModal, selectAsset, selectComponent } = useContext(GlobalContext)

    useEffect(() => {
        selectAsset(null)
        selectComponent(null)
    })

    return (
        <div style={{ maxWidth: 400 }}>
            <HeaderTitle title="Components">
                <button
                    onClick={() => closeModal()}
                    className="p-2 hover:bg-gray-100 rounded">
                    <ReactSVG src={CloseIcon} />
                </button>
            </HeaderTitle>
            <div className="overflow-scroll p-2" style={{ maxHeight: 500, minWidth: 400, paddingBottom: 0 }}>
                {/* <AssetPicker /> */}
                <Components />
                </div>
        </div>
    )
}
