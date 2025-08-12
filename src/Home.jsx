import Cookies from "js-cookie";

const Home = () => {


    return (
        <>
            <h1 className='text-red-800 text-8xl'>
                Welcome {
                Cookies.get('username')
            }
            </h1>
        </>
    )
}


export default Home;