import { ReactNode } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { GetCharacter, Results } from '../types';
import styles from '../styles/CharacterList.module.css'
import Layout from '../Components/Layout';

const Character: NextPage<{ results: Results[] }> = ({ results }) => {
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
  const resp = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacter = await resp.json();
  return { props: { results } };
}

export default Character;