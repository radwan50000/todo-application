import MenuCloseNavButton from "./MenuCloseNavButton.jsx";
import SettingGear from "./SettingGear.jsx";
import AppData from './AppData.jsx';
import searchImg from '../assets/search-alt-2-svgrepo-com.svg';
import {useEffect, useContext, useState} from 'react';
import SearchController from "./SearchController.js";

const SearchComponent = () => {
    let data = useContext(AppData);
    const conroller = new SearchController();
    let [searchValue , setSearchValue] = useState('');

    useEffect(() => {
        console.log(data.navMenuOpened);
    },[data.navMenuOpened]);

    return (
        <>
            <div
                    className={'right-component-style'}
                >
                {/*Nav Hamburger Menu*/}
                <div
                    className='opt-header'
                >
                    <MenuCloseNavButton/>
                </div>
                {/* Data Page Container */}
                <div
                className='w-11/12 h-full mx-auto
                flex flex-col items-center justify-start text-gray-400 '>
                        <div
                            className='search-input-container'
                        >
                            <img
                                src={searchImg}
                                alt={'search icon'}
                                />
                            <input
                                type={'text'}
                                placeholder={'Search Task'}
                                className='search-input'
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className='w-full h-11/12 bg-red-800
                                p-2 flex flex-col items-center justify-start
                                overflow-x-hidden overflow-y-scroll no-scrollbar

                            '
                        >
                        AAA
                        </div>
                </div>
                {/* End Data Page Container */}


            </div>
        </>
    )
}

export default SearchComponent;