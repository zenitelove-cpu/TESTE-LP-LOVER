/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Flower2, Wind, MousePointer2, Instagram, Facebook, Twitter, Menu, Heart, ArrowLeft } from "lucide-react";

// Types for our petals
interface PetalProps {
  id: number;
  color: string;
  size: number;
  startX: number;
  startY: number;
  angle: number;
  distance: number;
  rotation: number;
}

const COLORS = [
  "#E3F2FD", // Azul claro leve
  "#FCE4EC", // Rosa claro leve
  "#FFF9C4", // Creme
  "#B3E5FC", // Azul suave
  "#F8BBD0", // Rosa suave
  "#FDF5E6", // Old Lace (creme rico)
];

const PetalsExplosion = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  const [petals, setPetals] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1000 pétalas para preenchimento total e impacto de alto padrão
    const burstCount = 800; // Aumentado para manter densidade
    const rainCount = 400;

    const burstPetals = Array.from({ length: burstCount }).map((_, i) => ({
      id: `burst-${i}`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 0.1 + Math.random() * 2.2,
      depth: Math.random(),
      angle: Math.random() * Math.PI * 2,
      distance: 200 + Math.random() * 1500,
      rotation: (Math.random() - 0.5) * 4000,
      delay: Math.random() * 10, // Aumentado para 10 segundos
      sway: 100 + Math.random() * 300,
      duration: 10 + Math.random() * 12,
      startX: '50vw',
      startY: '50vh'
    }));

    const rainPetals = Array.from({ length: rainCount }).map((_, i) => ({
      id: `rain-${i}`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 0.2 + Math.random() * 1.5,
      depth: Math.random(),
      angle: Math.PI * 0.5 + (Math.random() - 0.5) * 0.5,
      distance: 500 + Math.random() * 800,
      rotation: (Math.random() - 0.5) * 2000,
      delay: Math.random() * 10, // Aumentado para 10 segundos
      sway: 150 + Math.random() * 400,
      duration: 15 + Math.random() * 10,
      startX: `${Math.random() * 100}vw`,
      startY: `-10vh`
    }));
    
    setPetals([...burstPetals, ...rainPetals]);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      style={{ x: mousePos.x, y: mousePos.y }}
      className="fixed inset-0 pointer-events-none overflow-hidden h-screen w-screen z-[100]"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="petal pointer-events-none fixed"
          initial={{ x: petal.startX, y: petal.startY, opacity: 0, scale: 0, rotateZ: 0 }}
          animate={{
            x: [
              petal.startX,
              `calc(${petal.startX} + ${Math.cos(petal.angle) * (petal.distance * 0.2)}px)`,
              `calc(${petal.startX} + ${Math.cos(petal.angle) * petal.distance}px + ${petal.sway}px)`,
              `calc(${petal.startX} + ${Math.cos(petal.angle) * petal.distance}px - ${petal.sway}px)`,
              `calc(${petal.startX} + ${Math.cos(petal.angle) * petal.distance}px + ${petal.sway * 0.5}px)`,
            ],
            y: [
              petal.startY, 
              `calc(${petal.startY} + ${Math.sin(petal.angle) * (petal.distance * 0.2)}px)`, 
              `30vh`, 
              `120vh`
            ],
            opacity: [0, 1, 0.8, 0.5, 0],
            scale: [0, petal.size, petal.size * 0.9, petal.size * 0.7, 0.2],
            rotateZ: [0, petal.rotation * 0.3, petal.rotation * 0.7, petal.rotation],
            rotateX: [0, 180, 540, 1080],
            rotateY: [0, 360, 1080, 2160],
          }}
          transition={{
            duration: petal.duration,
            times: [0, 0.1, 0.3, 1],
            ease: "easeInOut",
            delay: petal.delay,
          }}
          style={{
            zIndex: Math.floor(petal.depth * 100),
            filter: `blur(${petal.depth < 0.15 ? '2px' : petal.depth > 0.85 ? '5px' : '0px'})`,
            width: `${16 * petal.size}px`,
            height: `${24 * petal.size}px`,
            color: petal.color,
          }}
        >
          <div className="petal-inner" style={{ 
            opacity: 0.6 + petal.depth * 0.4,
            transform: `scale(${0.8 + petal.depth * 0.4})`
          }} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<'home' | 'video'>('home');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-rose-100 selection:text-rose-900 bg-[#FAFAF8] overflow-hidden">
      {/* GLOBAL IMMERSIVE BACKGROUND */}
      <motion.div 
        style={{ 
          x: mousePos.x * -1.2,
          y: mousePos.y * -1.2,
          scale: 1.2
        }}
        className="fixed inset-0 z-0 select-none pointer-events-none bg-rose-50"
      >
        {/* Camada mínima de ambiência para garantir legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30 z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=95&w=2800" 
          alt="Lush Flower Garden Field"
          className="w-full h-full object-cover animate-breeze"
        />
      </motion.div>

      <PetalsExplosion mousePos={mousePos} />

      {/* Navigation - Ultra Minimalist Overlay */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView('home')}
          className="text-xl md:text-2xl font-serif tracking-[0.3em] font-bold text-gray-900 cursor-pointer"
        >
          MAISON D'AMOUR
        </motion.div>
        
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div 
              key="nav-home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.5em] font-light text-gray-500"
            >
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">A Essência</a>
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">Galeria</a>
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">Eternidade</a>
            </motion.div>
          ) : (
            <motion.button
              key="nav-video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => setView('home')}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-medium text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Voltar ao Jardim
            </motion.button>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Areas with Transitions */}
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-30 min-h-screen flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="inline-block text-[10px] uppercase tracking-[1em] text-rose-400 mb-8 font-sans font-semibold">
                PARA SEMPRE • VOCÊ
              </span>
              <h1 className="text-6xl md:text-[11rem] font-serif font-bold leading-[0.85] mb-12 tracking-[-0.05em] text-gray-900 drop-shadow-sm">
                Eu Te Amo, <br />
                <span className="italic font-display font-light text-rose-300">amor da minha vida</span>
              </h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <button 
                  onClick={() => setView('video')}
                  className="group relative px-16 py-6 bg-stone-900 text-white rounded-full overflow-hidden transition-all duration-700 hover:bg-rose-500 active:scale-95 shadow-2xl hover:shadow-rose-300/50"
                >
                  <span className="relative z-10 font-sans text-xs uppercase tracking-[0.4em] font-medium">Ver Nosso Legado</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </button>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 text-[9px] uppercase tracking-[0.6em] font-light">
              Maison d'Amour • 2026
            </div>
          </motion.main>
        ) : (
          <motion.main 
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Cinematic Video Backdrop */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover scale-105"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-ethereal-wildflowers-in-a-field-at-sunset-34563-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Content Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="relative z-20 text-center px-4"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-12"
              >
                <Heart size={48} className="text-rose-400 mx-auto" strokeWidth={1} />
              </motion.div>
              <h2 className="text-white text-4xl md:text-6xl font-serif italic font-light tracking-widest mb-8">A Essência do Nosso Amor</h2>
              <div className="w-12 h-px bg-rose-400/50 mx-auto mb-8" />
              <p className="text-white/40 text-[10px] uppercase tracking-[1em] font-light">Uma jornada sem fim pelo tempo</p>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={() => setView('home')}
              className="absolute bottom-16 px-12 py-4 border border-white/10 text-white/50 rounded-full text-[9px] uppercase tracking-[0.5em] hover:border-white/40 hover:text-white transition-all duration-700"
            >
              Fechar • Voltar
            </motion.button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

