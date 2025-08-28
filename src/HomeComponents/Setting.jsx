import {useContext} from 'react';
import AppData from './AppData';

const Setting = () => {
    const data = useContext(AppData);
    return (
        <div
            className='
                w-full h-dvh
                overflow-hidden
                bg-gray-bg-dark
            '
            >
            <h1
                className='text-4xl text-white'
                onClick={() => {
                    data.setSettingSection(false);
                }}
            >
                Setting Section
            </h1>
        </div>
    )
}

export default Setting;