import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetCharacter, Results } from '../../types';
import Layout from '../../Components/Layout';

export default function characterDetail({ character }: { character: Results }) {
    return (
        <>
            <div key={character.id}>{character.name}</div>
            <Image
                src={character.image}
                alt={character.name}
                height={200}
                width={200}>
            </Image>
            <br />
            <Link href={"/characterList"}>Character List</Link>
            <br />
        </>
    )
}

characterDetail.getLayout = function getLayout(page: ReactNode) {
    return <Layout>{page}</Layout>
}

export const getStaticPaths = async () => {
    const resp = await fetch(`https://rickandmortyapi.com/api/character`);
    const { results }: GetCharacter = await resp.json();
    const paths = results.map((character: Results) => ({ params: { id: character.id.toString() } }));
    return { paths, fallback: false };
}

export const getStaticProps = async (context: { params: { id: string } }) => {
    const resp = await fetch(`https://rickandmortyapi.com/api/character/${context.params.id}`);
    const character: Results = await resp.json();
    return { props: { character } };
}