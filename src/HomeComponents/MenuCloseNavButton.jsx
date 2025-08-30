import menuImg from "../assets/menu-icon.svg";


const MenuCloseNavButton = ({setNavMenuOpened,navMenuOpened}) => {

    return (
        <span
            className='cursor-pointer
                    transition duration-250 ease-in-out
                    hover:invert-70
                    xl:invisible
                    max-sm:inline-block sm:inline-block
                    '
            onClick={() => {
                setNavMenuOpened(!navMenuOpened);

            }}
        >
                    <img
                        src={menuImg}
                        className='w-5'
                    />
                </span>
    )
}

export default MenuCloseNavButton;