import settingGear from '../assets/setting-svgrepo-com.svg';
import {useContext} from 'react';
import AppData from './AppData.jsx';

const SettingGear = () => {
    const data = useContext(AppData);
    return (
        <span
            className='cursor-pointer
                    transition duration-250 ease-in-out
                    hover:invert-70
                    inline-block
                    xl:right-10 lg:right-8
                    max-sm:right-3 sm:right-3
                    '
            onClick={() => {
                data.setSettingSection(!data.settingSection);

            }}
        >
                    <img
                        src={settingGear}
                        className='
                             xl:w-7 lg:w-6
                             max-sm:w-5 sm:w-5
                        '
                    />
                </span>
    )
}

export default SettingGear;