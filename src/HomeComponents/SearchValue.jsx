
const SearchValue = ({taskName , projectName}) => {
    return (
        <div
            className='w-full h-auto py-1 px-2
                                        flex items-start cursor-pointer
                                        flex-wrap text-wrap
                                        rounded-r-md
                                        break-after-page
                                        flex-col justify-start
                                        border-l border-gray-300
                                        hover:bg-trans2-white
                                        my-4
                                        '
            onClick={() => {

            }}
        >
            <p
                className='
                        text-gray-300
                        xl:text-xl xl:w-8/12
                        max-sm:text-lg sm:text-lg
                    '
            >
                {taskName}
            </p>
            <div
                className='w-full h-fit
                                                flex flex-row gap-2
                                                items-center justify-start
                                                text-gray-300
                                                xl:text-xl xl:w-4/12
                                                max-sm:text-lg sm:text-lg
                                            '
            >
                <span className='text-yellow-400'>From :</span>
                <span>{projectName}</span>
            </div>

        </div>
    )
}

export default SearchValue;