import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../Components/Layout';
import { Results } from '../../types';

export default function characterDetailServerSideProps({ character }: { character: Results }) {
    const router = useRouter();
    return (
        <>
            <div key={character.id}>{`#${router.query.id} ${character.name}`}</div>
            <Image
                src={character.image}
                alt={character.name}
                height={200}
                width={200}>
            </Image>
            <br />
            <Link href={"/characterList"}>Character List</Link>
        </>
    )
}

characterDetailServerSideProps.getLayout = function getLayout(page: ReactNode) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character: Results = await resp.json();
    return { props: { character } };
}