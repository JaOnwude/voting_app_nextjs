import Header from '../components/Header';
import VoteForm from '../components/VoteForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-50 px-4 py-12 flex flex-col items-center justify-center">
      <Header />
      <VoteForm />
    </main>
  );
}