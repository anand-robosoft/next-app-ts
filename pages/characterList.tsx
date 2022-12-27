import { ReactNode } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { GetCharacter, Results } from '../types';
import styles from '../styles/CharacterList.module.css'
import Layout from '../Components/Layout';

const Character: NextPage<{ results: Results[] }> = ({ results }) => {
  console.log(process.env.API_DOMAIN); //its undefined, because its private, only shows for server side
  console.log(process.env.NEXT_PUBLIC_TEST_KEY); //it will print
  return (
    <>
      <div className={styles.title}>Get Static Path</div>
      {results.map((character: any) =>
        <Link key={character.id} href={`/characterDetail/${character.id}`}>
          <div>{character.name}</div>
        </Link>
      )}
      <br />
      <div className={styles.title}>Get Server Side Props</div>
      {results.map((character: any) =>
        <Link key={character.id} href={`/characterDetailServerSideProps/${character.id}`}>
          <div>{character.name}</div>
        </Link>
      )}
      <br />
      <Link href={"/"}>Home</Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log(process.env.API_DOMAIN); //it will print
  console.log(process.env.NEXT_PUBLIC_TEST_KEY); //it will print
  const resp = await fetch(`${process.env.API_DOMAIN}/api/character`);
  const { results }: GetCharacter = await resp.json();
  return { props: { results } };
}

export default Character;