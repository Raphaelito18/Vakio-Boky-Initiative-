import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';

export default function App() {
  return (
    <div className='relative min-h-screen text-gray-900 overflow-hidden'>
      {/* --- Arrière-plan flou avec léger zoom --- */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105'
        style={{ backgroundImage: "url('/assets/images/home.jpeg')" }}
      ></div>

      {/* --- Couche sombre semi-transparente --- */}
      <div className='absolute inset-0 bg-black/40'></div>

      {/* --- Contenu principal --- */}
      <div className='relative z-10 pt-14'>
        <Header />

        <main className='flex flex-col items-center justify-center text-center px-6 py-24 animate-fadeIn'>
          {/* --- Titre principal --- */}
          <h1 className='text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg'>
            Votre <span className='text-blue-300'>Sanctuaire</span>
          </h1>

          {/* --- Sous-titre stylisé avec animation légère --- */}
          <h2
            className='text-7xl md:text-7xl mb-10 text-blue-200 animate-fadeIn delay-200'
            style={{
              fontFamily: "'UnifrakturCook', cursive",
              fontWeight: 700,
              textShadow: '2px 2px 5px rgba(0,0,0,0.6)',
            }}
          >
            Littéraire
          </h2>

          {/* --- Paragraphe d’accroche --- */}
          <div className='max-w-3xl mx-auto space-y-3 animate-fadeIn delay-400'>
            <p className='text-xl md:text-2xl leading-relaxed font-serif text-gray-100'>
              « Plongez dans un univers où les mots prennent vie et les
              discussions éveillent les esprits. »
            </p>
            <p className='text-xl md:text-2xl leading-relaxed font-serif text-gray-100'>
              Rejoignez notre cercle d’auteurs, de lecteurs et de passionnés des
              livres.
            </p>
          </div>

          {/* --- Boutons d’action dynamiques --- */}
          <div className='flex flex-wrap gap-4 justify-center mt-10 animate-fadeIn delay-600'>
            <Button variant='primary' size='lg'>
              Découvrir la communauté
            </Button>
            <Button variant='outline' size='lg'>
              En savoir plus
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
