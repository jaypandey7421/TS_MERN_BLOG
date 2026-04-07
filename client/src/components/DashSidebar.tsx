import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
    HiUser,
    HiArrowSmRight,
    HiDocumentText,
    HiAnnotation,
    HiChartPie,
} from 'react-icons/hi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useLocation, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.user);
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/signout`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.isAdmin ? 'Admin' : 'User'}
                            labelColor='dark'
                            as={'div'}
                        >
                            Profile
                        </SidebarItem>
                    </Link>
                    {currentUser && currentUser.isAdmin && (
                        <>
                            <Link to='/dashboard?tab=dash'>
                                <SidebarItem
                                    active={tab === 'dash' || !tab}
                                    icon={HiChartPie}
                                    as='div'
                                >
                                    Dashboard
                                </SidebarItem>
                            </Link>
                            <Link to='/dashboard?tab=posts'>
                                <SidebarItem
                                    active={tab === 'posts'}
                                    icon={HiDocumentText}
                                    as={'div'}
                                >
                                    Posts
                                </SidebarItem>
                            </Link>
                            <Link to='/dashboard?tab=users'>
                                <SidebarItem
                                    active={tab === 'users'}
                                    icon={HiOutlineUserGroup}
                                    as='div'
                                >
                                    Users
                                </SidebarItem>
                            </Link>
                            <Link to='/dashboard?tab=comments'>
                                <SidebarItem
                                    active={tab === 'comments'}
                                    icon={HiAnnotation}
                                    as='div'
                                >
                                    Comments
                                </SidebarItem>
                            </Link>
                        </>
                    )}
                    <SidebarItem
                        onClick={handleSignout}
                        icon={HiArrowSmRight}
                        className='cursor-pointer'>
                        Sign Out
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}