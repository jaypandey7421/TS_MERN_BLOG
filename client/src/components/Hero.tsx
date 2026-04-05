

export default function Hero() {
    return (
        <div className="relative shadow-sm ">

            <section className="relative bg-gray-900">

                <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 min-h-[80vh] lg:min-h-[90vh]">
                    <div className="flex items-center px-4 pb-16 bg-white pt-28 sm:px-6 lg:px-8 lg:pb-24 xl:pr-12">
                        <div className="max-w-lg mx-auto lg:mx-0">
                            <p className="text-5xl sm:text-6xl lg:text-7xl">
                                ⚡️
                            </p>
                            <h1 className="mt-10 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                We write articles on development .
                            </h1>
                            <p className="mt-6 text-base font-normal leading-7 text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
                            </p>
                            <div className="relative inline-flex mt-10 group">
                                <div
                                    className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-linear-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200">
                                </div>

                                <a href="#" title=""
                                    className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    role="button">
                                    Read Exclusive Blog
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-end px-4 py-16 bg-gray-900 sm:px-6 lg:pb-24 lg:px-8 xl:pl-12">
                        <div className="absolute inset-0">
                            <img className="object-cover w-full h-full"
                                src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/grid-pattern.svg"
                                alt="" />
                        </div>

                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                            <p className="text-lg font-bold text-white">
                                Featured Articles
                            </p>

                            <div className="mt-6 space-y-5">
                                <div
                                    className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                                    <div className="px-4 py-5 sm:p-5">
                                        <div className="flex items-start lg:items-center">
                                            <a href="#" title="" className="shrink-0">
                                                <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer"
                                                    src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-2.png"
                                                    alt="" />
                                            </a>

                                            <div className="flex-1 ml-4 lg:ml-6">
                                                <p className="text-xs font-medium text-gray-900 lg:text-sm">
                                                    <a href="#" title="" className="">
                                                        Growth
                                                    </a>
                                                </p>
                                                <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                                                    <a href="#" title="" className="">
                                                        How a visual artist redefines success in graphic design
                                                    </a>
                                                </p>
                                                <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                                                    April 09, 2022
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                                    <div className="px-4 py-5 sm:p-5">
                                        <div className="flex items-start lg:items-center">
                                            <a href="#" title="" className="shrink-0">
                                                <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer"
                                                    src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-3.png"
                                                    alt="" />
                                            </a>

                                            <div className="flex-1 ml-4 lg:ml-6">
                                                <p className="text-xs font-medium text-gray-900 lg:text-sm">
                                                    <a href="#" title="" className="">
                                                        Growth
                                                    </a>
                                                </p>
                                                <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                                                    <a href="#" title="" className="">
                                                        How a visual artist redefines success in graphic design
                                                    </a>
                                                </p>
                                                <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                                                    April 09, 2022
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
