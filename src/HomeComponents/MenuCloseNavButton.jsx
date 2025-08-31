import menuImg from "../assets/menu-icon.svg";
import {useContext} from "react";
import AppData from './AppData.jsx';

const MenuCloseNavButton = ({setNavMenuOpened,navMenuOpened}) => {
    let data = useContext(AppData);

    return (
        <span
            className='cursor-pointer
                    transition duration-250 ease-in-out
                    hover:invert-70
                    xl:invisible
                    max-sm:inline-block sm:inline-block
                    '
            onClick={() => {
                data.setNavMenuOpened(!data.navMenuOpened);
            }}
        >
                    <img
                        src={menuImg}
                        alt={'Hamburger Menu Icon'}
                        className='w-5'
                    />
                </span>
    )
}

export default MenuCloseNavButton;