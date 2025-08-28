import {useContext} from 'react';
import AppData from './AppData';
import close from '../assets/close2.svg';

const Setting = () => {
    const data = useContext(AppData);
    return (
        <div
            className='
                w-full h-dvh
                overflow-hidden
                bg-gray-bg-dark
                p-8
                flex flex-col items-start justify-start
            '
            >
                {/*Close Setting Button*/}
                <span
                    className='absolute top-5  cursor-pointer
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
                            src={close}
                            className='
                                 xl:w-7 lg:w-6
                                 max-sm:w-5 sm:w-5
                            '
                        />
                </span>
        {/*  Header  */}
            <div
            className='
                flex w-full justify-start items-start
                text-gray-300 font-bold cairo
                xl:text-8xl xl:mt-8 xl:ml-8
                max-sm:mt-4 sm:mt-4
                max-sm:ml-4 sm:ml-4
                max-sm:text-5xl sm:text-5xl

            '>
                <h1>
                    Setting
                </h1>

            </div>
        </div>
    )
}

export default Setting;