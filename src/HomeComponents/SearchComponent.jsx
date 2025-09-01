import MenuCloseNavButton from "./MenuCloseNavButton.jsx";
import SettingGear from "./SettingGear.jsx";
import AppData from './AppData.jsx';
import searchImg from '../assets/search-alt-2-svgrepo-com.svg';
import {useEffect, useContext, useState} from 'react';
import SearchController from "./SearchController.js";
import searchIll from '../assets/search_ill.webp';
import SearchValue from "./SearchValue.jsx";

const SearchComponent = () => {
    let data = useContext(AppData);
    const controller = new SearchController();
    let [searchValue , setSearchValue] = useState('');
    let [tasksArr , setTasksArr] = useState([]);

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
                                    console.log('This is Matched Arr');
                                    console.log(controller.getMatchedTasks(e.target.value));
                                    setTasksArr(controller.getMatchedTasks(e.target.value));
                                }}
                            />
                        </div>
                        <div
                            className='w-full h-11/12
                                 flex flex-col items-center justify-start
                                overflow-x-hidden overflow-y-scroll no-scrollbar
                                xl:p-2
                                max-sm:p-0 sm:p-0
                                max-sm:mt-4 sm:mt-4

                            '
                        >
                            {
                                ( searchValue.trim() === ''  ) || ( tasksArr.length < 1 )?
                                    <div
                                        className='w-full
                                        flex flex-col items-center justify-center
                                        lg:h-8/12
                                        max-sm:h-6/12 sm:h-6/12
                                        '
                                        >
                                        <img
                                            src={searchIll}
                                            alt={'search image'}
                                            className='
                                            saturate-10
                                            brightness-50
                                            xl:w-4/12
                                            max-sm:w-6/12 sm:w-6/12
                                            '
                                        />
                                        <p
                                            className='cairo text-lg font-medium italic'
                                        >
                                            No Tasks Found
                                        </p>
                                    </div>
                                    :
                                    tasksArr.map((task,i) => (
                                        <SearchValue key={i} taskName={task.taskName} projectName={task.projectName} />
                                    ))
                            }
                        </div>
                </div>
                {/* End Data Page Container */}


            </div>
        </>
    )
}

export default SearchComponent;