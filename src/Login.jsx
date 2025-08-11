
const Login = () => {
    return (
        <>
            <div
                className='w-full h-dvh flex flex-row
                items-start justify-between '>
                <div className='w-5/12 h-dvh bg-transparent
                    pl-16 pb-32
                    flex justify-center flex-col'>
                    <h1 className='text-7xl font-black mb-4'>
                        Sign In
                    </h1>
                    <div
                        className='login-input-container'
                        >
                        <h3
                            className='input-name'>
                            User Name
                        </h3>
                        <input
                            type='text'
                            placeholder={'Enter Username ...'}
                            id={'username-input'}
                            className=''
                            />
                    </div>
                </div>
                <div className='w-7/12 h-dvh bg-blue-800'></div>
            </div>

        </>
    )
}

export default Login;