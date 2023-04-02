import Head from 'next/head';
import { CommonLayout } from '@/components/layout/common-layout';
import { ReactElement, ReactNode } from 'react';
import UserContainer from '@/components/user/user-container';
import UserDetails from '@/components/user/user-details';
import UserArtworks from '@/components/user/user-artworks';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/graphql/__generated__/graphql';
import { Tab } from '@headlessui/react';

import UserLikes from '@/components/user/user-likes';

const categories = ['Artworks', 'Likes'];
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function User() {
    const router = useRouter();
    const { user } = router.query;

    const { data, loading, error } = useUserQuery({
        variables: { username: user as string },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });

    return (
        <>
            <Head>
                <title>{user}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UserContainer>
                {!data && loading && <div>USER LOADING</div>}
                {data?.user.user && !error && (
                    <>
                        <UserDetails
                            username={data.user.user.username}
                            avatarUrl={data.user.user.avatarUrl}
                            isFollowedByLoggedInUser={data?.user.user.isFollowedByLoggedInUser}
                        />
                        <Tab.Group>
                            <Tab.List className="flex p-1 gap-10 w-full justify-center mb-3">
                                {categories.map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-16 font-bold border-b-2 focus:outline-none',
                                                selected ? ' text-[#DE5D82] border-b-2 border-[#DE5D82]' : ''
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    {/* This will contain the infiniteScroll hook and graphql Query */}
                                    <UserArtworks artworks={data.user.user.artworks} />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <UserLikes username={user as string} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </>
                )}
            </UserContainer>
        </>
    );
}

User.getLayout = (page: ReactElement): ReactNode => <CommonLayout>{page}</CommonLayout>;
