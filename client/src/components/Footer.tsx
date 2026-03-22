import { Footer, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup, FooterTitle, FooterIcon } from "flowbite-react"
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import { Link } from "react-router"

export default function FooterCom() {
    return (
        <Footer container >
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg sm:text-3xl font-semibold dark:text-white'
                        >
                            DEV.Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <FooterTitle title='About' />
                            <FooterLinkGroup col>

                                <FooterLink
                                    href='/about'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    DEV.Blog
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Follow us' />
                            <FooterLinkGroup col>
                                <FooterLink
                                    href='https://www.github.com/jaypandey7421'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </FooterLink>
                                <FooterLink href='#'>Discord</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Legal' />
                            <FooterLinkGroup col>
                                <FooterLink href='#'>Privacy Policy</FooterLink>
                                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <FooterCopyright
                        href='#'
                        by="DEV.Blog"
                        year={new Date().getFullYear()}
                    />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <FooterIcon href='#' icon={BsFacebook} />
                        <FooterIcon href='#' icon={BsInstagram} />
                        <FooterIcon href='#' icon={BsTwitter} />
                        <FooterIcon href='https://github.com/jaypandey7421' icon={BsGithub} target='_blank' rel='noopener noreferrer' />
                        <FooterIcon href='#' icon={BsDribbble} />

                    </div>
                </div>
            </div>
        </Footer>
    )
}