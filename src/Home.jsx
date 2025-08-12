import Cookies from "js-cookie";
import HomeNav from './HomeComponents/HomeNav.jsx';

const Home = () => {

    return (
        <>
            <div
                className='flex flex-row items-start
                    bg-gray-bg w-full h-dvh
                    '>
                <HomeNav/>
            </div>
        </>
    )
}


export default Home;