import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// +15 Mensajes Variados para los Hitos de Score (Múltiplos de 10)
const BASE_LOVE_MESSAGES = [
  "¡Increíble mi amor! Eres la campeona de mi corazón 🥰",
  "Cada pez atrapado me recuerda lo afortunado que soy de tenerte ✨",
  "¡Subiendo como nuestro amor! Eres la mejor jugando ❤️",
  "Mi mundo entero brilla mucho más cuando sonríes de esta manera 🌸",
  "¡Vas lejísimos! Justo como mi meta de hacerte feliz para siempre 🚀",
  "¿Ya te dije hoy que eres la niña más hermosa de todo el universo? 👑",
  "Ningún obstáculo es grande si lo saltamos juntos agarrados de la mano 💕",
  "Estás ganando en el juego y te ganaste toda mi vida entera 🥰",
  "¡Me encantas! Eres mi motivación diaria para todo lo que hago 🌹",
  "Tu amor es mi premio gordo, mi pescado dorado de todos los días 🌟",
  "Qué bonita te ves concentrada jugando esto. Te adoro demasiado 🐰",
  "¡Esos reflejos! Definitivamente eres perfecta en absolutamente todo 😍",
  "A tu lado, cualquier lugar del mundo se siente como casa 🏠💖",
  "Gracias por regalarme los momentos más felices de mis días 💕",
  "¡No te detengas! Tu gatito confía en ti tanto como yo lo hago siempre 🎉",
  "Haces que mi corazón haga un salto doble de pura alegría contigo ✨"
];

const LOVE_LETTERS = [
  "Hola mi amor, quería escribirte esto para recordarte lo muchísimo que significas para mí. Desde que estás a mi lado, todo tiene un color más alegre y bonito. Gracias por ser mi apoyo incondicional, mi compañera de risas y mi lugar seguro. Te amo con todo mi corazón.",
  "Sé que a veces la vida puede ponerse un poco caótica o traer contratiempos, pero me llena de paz saber que nos tenemos el uno al otro para saltar cualquier obstáculo. Estoy increíblemente orgulloso de nosotros y de todo lo que construimos día con día.",
  "Eres la persona con la que quiero compartir cada pequeño logro, cada tarde tranquila y cada proyecto. Amo la forma en la que me cuidas, cómo me haces reír y lo bonita que es la vida simplemente porque estás en ella. Eres mi hogar.",
  "Si este juego fuera infinito, se quedaría corto comparado con las ganas que tengo de pasar el resto de mis días haciéndote feliz. Eres mi recordatorio constante de que las cosas más valiosas no se buscan, llegan al corazón.",
  "Gracias por tu paciencia, tus abrazos curativos y por ser exactamente como eres. No cambiaría absolutamente nada de ti ni de los momentos que pasamos juntos. Eres, por mucho, lo mejor de mi realidad y mi destino favorito."
];

const SKINS_DATA = [
  { id: 'naranja', name: 'GATO NARANJA', cMain: '#ff8c1a', cDark: '#e06a00', cLight: '#ffa64d' },
  { id: 'negro', name: 'GATO NEGRO', cMain: '#2d2d2d', cDark: '#1a1a1a', cLight: '#4d4d4d' },
  { id: 'gris', name: 'GATO GRIS', cMain: '#9e9e9e', cDark: '#757575', cLight: '#bdbdbd' },
  { id: 'blanco', name: 'GATO BLANCO', cMain: '#f5f5f5', cDark: '#bcbcbc', cLight: '#ffffff' }
];

export default function App() {
  const [screen, setScreen] = useState('menu'); 
  const [notification, setNotification] = useState('');
  const [letterIndex, setLetterIndex] = useState(0);
  const [activeMessages, setActiveMessages] = useState([]);
  const [selectedSkin, setSelectedSkin] = useState('naranja');

  const shuffleMessages = () => {
    const shuffled = [...BASE_LOVE_MESSAGES].sort(() => Math.random() - 0.5);
    setActiveMessages(shuffled);
  };

  const triggerNotification = (score) => {
    const index = Math.floor(score / 10) - 1;
    if (index >= 0 && activeMessages.length > 0) {
      const msg = activeMessages[index % activeMessages.length];
      setNotification(msg);
      setTimeout(() => setNotification(''), 4200);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      
      {notification && <div className="love-notification">{notification}</div>}

      {/* 1. MENÚ PRINCIPAL CON DECORACIONES SIN EXCESO */}
      {screen === 'menu' && (
        <div className="stardew-container">
          <span className="bg-flower" style={{ top: '15%', left: '12%' }}>🌸</span>
          <span className="bg-flower" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>🎀</span>
          <span className="bg-flower" style={{ bottom: '25%', left: '18%', animationDelay: '4s' }}>🌟</span>
          <span className="bg-flower" style={{ bottom: '15%', right: '10%', animationDelay: '1s' }}>🌸</span>

          <h1 className="title-pulse">STARDEW LOVE</h1>
        

          <button className="stardew-btn" onClick={() => setScreen('skins')}>START</button>
          <button className="stardew-btn" onClick={() => setScreen('letter')}>LETTERS</button>
          <button className="stardew-btn" onClick={() => {
            if(window.confirm("¿Segura que quieres salir de la página de amor?")) window.close();
          }}>QUIT</button>
        
         <div style={{ marginTop: '20px', fontSize: '9px', color: '#fff', letterSpacing: '1px' }}>✿ Hecho con amor para ti Lesly ✿</div>
        </div>
      )}

      {/* 2. SELECTOR DE SKINS CON VISUALIZACIÓN FIEL */}
      {screen === 'skins' && (
        <div className="stardew-container" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '13px', marginBottom: '25px', textAlign: 'center', color: '#fff', textShadow: '2px 2px 0px #d47a93' }}>ELIGE TU COMPAÑERO</h2>
          
          <div className="skin-grid">
            {SKINS_DATA.map(skin => (
              <div key={skin.id} 
                   className={`skin-card ${selectedSkin === skin.id ? 'selected' : ''}`}
                   onClick={() => setSelectedSkin(skin.id)}>
                
                {/* Dibujo mini del gato respectivo en CSS */}
                <div className="mini-cat-preview" style={{ backgroundColor: skin.cMain, border: `2px solid ${skin.cDark}` }}>
                  <div className="mini-cat-ear" style={{ left: 2, backgroundColor: skin.cDark }}></div>
                  <div className="mini-cat-ear" style={{ right: 2, backgroundColor: skin.cDark }}></div>
                  <div style={{ position: 'absolute', top: 6, left: 4, width: 4, height: 4, backgroundColor: '#000', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', top: 6, right: 4, width: 4, height: 4, backgroundColor: '#000', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', bottom: 2, left: '20%', width: '60%', height: '50%', backgroundColor: skin.id === 'blanco' ? '#e0f2fe' : '#fff0db', borderRadius: '2px' }}></div>
                </div>

                <div className="skin-name">{skin.name}</div>
                <div className="skin-status">
                  {selectedSkin === skin.id ? '[ ACTIVO ]' : 'SELECCIONAR'}
                </div>
              </div>
            ))}
          </div>

          <button className="stardew-btn" onClick={() => { shuffleMessages(); setScreen('start'); }}>JUGAR</button>
          <button className="stardew-btn" style={{ fontSize: '10px', padding: '8px 16px' }} onClick={() => setScreen('menu')}>VOLVER</button>
        </div>
      )}

      {/* 3. MINIJUEGO CON FONDOS, NUBES Y REAJUSTES */}
      {screen === 'start' && (
        <div className="stardew-container" style={{ padding: '10px' }}>
          <button className="stardew-btn" style={{ position: 'absolute', top: 15, left: 15, padding: '8px 16px', fontSize: '11px', zIndex: 10 }} onClick={() => setScreen('menu')}>
            MENÚ
          </button>
          <SkyJumpGame skin={selectedSkin} onMilestone={triggerNotification} onRestart={shuffleMessages} />
        </div>
      )}

      {/* 4. CARTAS CON BOTÓN CONTROLADO Y COMPAÑEROS DE COLOR */}
      {screen === 'letter' && (
        <div className="stardew-container" style={{ padding: '20px' }}>
          <div className="letter-box">
            <h2 style={{ fontSize: '11px', marginBottom: '15px', color: '#d47a93', textAlign: 'center' }}>Página de Recuerdos #{letterIndex + 1}</h2>
            <p style={{ fontFamily: 'sans-serif', lineHeight: '1.7', fontSize: '16px', color: '#4a4a4a', margin: '0 0 20px 0', minHeight: '160px' }}>{LOVE_LETTERS[letterIndex]}</p>
            
            {/* Decoración de gatitos inferiores que combinan con los del minijuego */}
            <div className="letter-footer-cats">
              <span style={{ fontSize: '16px' }}>🐱❤️</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', display: 'inline-block', backgroundColor: '#ff8c1a', borderRadius: '2px' }}></span>
                <span style={{ width: '10px', height: '10px', display: 'inline-block', backgroundColor: '#2d2d2d', borderRadius: '2px' }}></span>
                <span style={{ width: '10px', height: '10px', display: 'inline-block', backgroundColor: '#9e9e9e', borderRadius: '2px' }}></span>
                <span style={{ width: '10px', height: '10px', display: 'inline-block', backgroundColor: '#f5f5f5', border: '1px solid #ccc', borderRadius: '2px' }}></span>
              </div>
              <span style={{ fontSize: '16px' }}>❤️🐱</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              <button className="stardew-btn" style={{ fontSize: '11px', padding: '10px 20px', margin: 0 }} 
                disabled={letterIndex === 0} 
                onClick={() => setLetterIndex(prev => prev - 1)}>Atrás</button>
              
              {/* Desaparece por completo si es la última carta */}
              {letterIndex < LOVE_LETTERS.length - 1 && (
                <button className="stardew-btn" style={{ fontSize: '11px', padding: '10px 20px', margin: 0 }} 
                  onClick={() => setLetterIndex(prev => prev + 1)}>Siguiente</button>
              )}
            </div>
          </div>
          <button className="stardew-btn" style={{ marginTop: '25px', fontSize: '12px' }} onClick={() => setScreen('menu')}>VOLVER</button>
        </div>
      )}
    </div>
  );
}

// DRIVER COMPONENTE DEL MINIJUEGO ACTUALIZADO
function SkyJumpGame({ skin, onMilestone, onRestart }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasShield, setHasShield] = useState(false);
  
  const scoreRef = useRef(0);
  const lastMilestone = useRef(0);
  const shieldRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const mobileLeft = useRef(false);
  const mobileRight = useRef(false);

  useEffect(() => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const isSmallScreen = window.innerWidth < 430;
    canvas.width = isSmallScreen ? window.innerWidth - 30 : 400;
    canvas.height = 480;

    // FÍSICAS REBAJADAS (Ascenso controlado)
    const player = {
      x: canvas.width / 2 - 20,
      y: 350,
      width: 40,
      height: 40,
      vy: 0,
      jumpForce: -10,
      gravity: 0.35,
      speed: 6.0
    };

    // Estructura de nubes decorativas de fondo
    let backgroundClouds = [
      { x: 30, y: 80, scale: 1.2 },
      { x: 220, y: 160, scale: 0.9 },
      { x: 100, y: 280, scale: 1.1 },
      { x: 290, y: 380, scale: 0.8 }
    ];

    let platforms = [];
    const keys = { Left: false, Right: false };

    // Tasa de spawn reducida con 3.33% exacto para pez de oro ($1/30$)
    const generateFish = () => {
      if (Math.random() <= 0.30) { // Reducido a solo 30% de probabilidad por plataforma
        const isGolden = Math.random() <= 0.0333; 
        return {
          xOffset: 12 + Math.random() * 25,
          width: 24,
          height: 14,
          active: true,
          type: isGolden ? 'golden' : 'normal'
        };
      }
      return null;
    };

    // Crear niveles de inicio
    for (let i = 0; i < 6; i++) {
      const platY = canvas.height - (i * 85) - 40;
      platforms.push({
        x: Math.random() * (canvas.width - 75),
        y: platY,
        width: 75,
        height: 15,
        fish: i === 0 ? null : generateFish()
      });
    }
    platforms[0].x = canvas.width / 2 - 37;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.Left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.Right = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.Left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.Right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const updateGame = () => {
      if (keys.Left || mobileLeft.current) player.x -= player.speed;
      if (keys.Right || mobileRight.current) player.x += player.speed;

      if (player.x < -player.width) player.x = canvas.width;
      if (player.x > canvas.width) player.x = -player.width;

      player.vy += player.gravity;
      player.y += player.vy;

      // Colisión con plataformas superiores
      if (player.vy > 0) {
        platforms.forEach((plat) => {
          if (
            player.x + player.width - 5 > plat.x &&
            player.x + 5 < plat.x + plat.width &&
            player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + plat.height + player.vy
          ) {
            player.vy = player.jumpForce;
          }
        });
      }

      // Interacción con Peces
      platforms.forEach((plat) => {
        if (plat.fish && plat.fish.active) {
          const fishX = plat.x + plat.fish.xOffset;
          const fishY = plat.y - 15;

          if (
            player.x < fishX + plat.fish.width &&
            player.x + player.width > fishX &&
            player.y < fishY + plat.fish.height &&
            player.y + player.height > fishY
          ) {
            plat.fish.active = false;

            if (plat.fish.type === 'golden') {
              scoreRef.current += 5; 
              shieldRef.current = true;
              setHasShield(true);
            } else {
              scoreRef.current += 2;
            }

            setScore(scoreRef.current);

            if (Math.floor(scoreRef.current / 10) > lastMilestone.current) {
              lastMilestone.current = Math.floor(scoreRef.current / 10);
              onMilestone(scoreRef.current);
            }
          }
        }
      });

      // Movimiento vertical de cámara y nubes de fondo
      if (player.y < canvas.height / 2) {
        const diff = canvas.height / 2 - player.y;
        player.y = canvas.height / 2;

        // Desplazar nubes de fondo lentamente
        backgroundClouds.forEach(cloud => {
          cloud.y += diff * 0.4;
          if (cloud.y > canvas.height) {
            cloud.y = -30;
            cloud.x = Math.random() * (canvas.width - 60);
          }
        });

        platforms.forEach((plat) => {
          plat.y += diff;
          if (plat.y > canvas.height) {
            plat.y = 0;
            plat.x = Math.random() * (canvas.width - plat.width);
            plat.fish = generateFish();
          }
        });
      }

      // Caída / Salvación con Segunda Oportunidad
      if (player.y > canvas.height) {
        if (shieldRef.current) {
          shieldRef.current = false;
          setHasShield(false);
          player.y = canvas.height / 2;
          player.x = canvas.width / 2 - 20;
          player.vy = player.jumpForce;
        } else {
          setGameOver(true);
          return;
        }
      }

      // ---- PROCESO DE RENDER CANVAS ----
      // Fondo Celeste Pastel Estable
      ctx.fillStyle = '#d4f0fc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render de Nubes Básicas con Poca Luz/Sombra
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      backgroundClouds.forEach(cloud => {
        const baseW = 50 * cloud.scale;
        const baseH = 22 * cloud.scale;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, baseH, 0, Math.PI * 2);
        ctx.arc(cloud.x + baseW * 0.4, cloud.y - baseH * 0.3, baseH * 1.2, 0, Math.PI * 2);
        ctx.arc(cloud.x + baseW * 0.8, cloud.y, baseH * 0.9, 0, Math.PI * 2);
        ctx.fill();
        
        // Sombra suave integrada en la base de la nube
        ctx.fillStyle = 'rgba(210, 230, 245, 0.5)';
        ctx.fillRect(cloud.x - baseW * 0.2, cloud.y + baseH * 0.6, baseW * 1.2, 4);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      });

      // Plataformas
      platforms.forEach((plat) => {
        ctx.fillStyle = '#bfa2db'; ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
        ctx.fillStyle = '#e3cdff'; ctx.fillRect(plat.x, plat.y, plat.width, 4);
        ctx.fillStyle = '#9b7ebb'; ctx.fillRect(plat.x, plat.y + plat.height - 3, plat.width, 3);

        // PECES REDISEÑADOS CON FORMA DE PEZ REAL (><>)
        if (plat.fish && plat.fish.active) {
          const fx = plat.x + plat.fish.xOffset;
          const fy = plat.y - 15;
          const isG = plat.fish.type === 'golden';

          ctx.fillStyle = isG ? '#ffd700' : '#8ecae6';
          // Cuerpo Central
          ctx.fillRect(fx + 6, fy + 3, 12, 8);
          // Cola estilizada (triangular pixel)
          ctx.fillRect(fx, fy + 1, 3, 3);
          ctx.fillRect(fx, fy + 8, 3, 3);
          ctx.fillRect(fx + 3, fy + 3, 3, 6);
          // Cabeza boca externa
          ctx.fillRect(fx + 18, fy + 4, 3, 6);
          
          // Luces y Sombras mínimas del pez
          ctx.fillStyle = isG ? '#fff4b3' : '#e0f2fe';
          ctx.fillRect(fx + 8, fy + 3, 6, 2); // Brillo superior
          ctx.fillStyle = isG ? '#b38600' : '#467c9f';
          ctx.fillRect(fx + 6, fy + 10, 10, 2); // Sombra inferior

          // Ojo del Pez
          ctx.fillStyle = '#000000';
          ctx.fillRect(fx + 15, fy + 5, 2, 2);
        }
      });

      // DETERMINAR PALETA ACTIVA DEL GATO CON SUS SOMBRAS
      const currentSkinObj = SKINS_DATA.find(s => s.id === skin) || SKINS_DATA[0];
      const px = player.x, py = player.y;

      // Aura de Segunda Oportunidad Activa
      if (shieldRef.current) {
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.strokeRect(px - 5, py - 5, player.width + 10, player.height + 10);
      }

      // Sombra del gato (Base inferior integrada)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(px + 4, py + player.height - 3, player.width - 8, 5);

      // Cuerpo principal del gato
      ctx.fillStyle = currentSkinObj.cDark; ctx.fillRect(px, py, player.width, player.height);
      ctx.fillStyle = currentSkinObj.cMain; ctx.fillRect(px, py, player.width - 4, player.height - 4);
      ctx.fillStyle = currentSkinObj.cLight; ctx.fillRect(px, py, player.width - 8, 5); ctx.fillRect(px, py, 5, player.height - 8);

      // Orejas Píxel
      ctx.fillStyle = currentSkinObj.cDark; ctx.fillRect(px + 2, py - 6, 8, 6);
      ctx.fillStyle = currentSkinObj.cLight; ctx.fillRect(px + 4, py - 4, 4, 4);
      ctx.fillStyle = currentSkinObj.cDark; ctx.fillRect(px + player.width - 10, py - 6, 8, 6);
      ctx.fillStyle = currentSkinObj.cLight; ctx.fillRect(px + player.width - 8, py - 4, 4, 4);

      // Pancita Clara
      ctx.fillStyle = skin === 'blanco' ? '#e0f2fe' : '#fff0db';
      ctx.fillRect(px + 10, py + 18, player.width - 20, player.height - 22);

      // Rostro Estrellado
      ctx.fillStyle = '#1a1a1a'; 
      ctx.fillRect(px + 8, py + 10, 5, 7); 
      ctx.fillRect(px + player.width - 13, py + 10, 5, 7);
      
      // Brillo del ojo (Luz sutil)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 8, py + 10, 2, 2);
      ctx.fillRect(px + player.width - 13, py + 10, 2, 2);

      // Mejillas Rosadas
      ctx.fillStyle = '#ffb3ba'; 
      ctx.fillRect(px + 3, py + 16, 4, 3); 
      ctx.fillRect(px + player.width - 7, py + 16, 4, 3);
      
      // Nariz tierna
      ctx.fillStyle = '#ff6680'; ctx.fillRect(px + (player.width / 2) - 2, py + 14, 4, 3);

      animationId = requestAnimationFrame(updateGame);
    };

    updateGame();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver, skin]);

  return (
    <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '13px', color: '#fff', textShadow: '2px 2px 0px #d47a93' }}>PECES: {score}</div>
        {hasShield && <div style={{ fontSize: '9px', color: '#ffd700', backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '4px' }}>🛡️ SALVACIÓN ALTA</div>}
      </div>
      
      <div style={{ position: 'relative', border: '6px solid #fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
        <canvas ref={canvasRef} />
        
        {gameOver && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(108, 91, 123, 0.92)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <h2 style={{ color: '#fff', fontSize: '13px', marginBottom: '20px', textShadow: '2px 2px 0px #d47a93' }}>¡Sigue intentándolo, amor!</h2>
            <button className="stardew-btn" onClick={() => {
              lastMilestone.current = 0;
              scoreRef.current = 0;
              shieldRef.current = false;
              setHasShield(false);
              setScore(0);
              setGameOver(false);
              onRestart();
            }}>INTENTAR DE NUEVO</button>
          </div>
        )}
      </div>

      {isMobile && !gameOver && (
        <div className="mobile-controls">
          <div className="touch-btn"
               onTouchStart={() => { mobileLeft.current = true; }}
               onTouchEnd={() => { mobileLeft.current = false; }}>◀</div>
          <div className="touch-btn"
               onTouchStart={() => { mobileRight.current = true; }}
               onTouchEnd={() => { mobileRight.current = false; }}>▶</div>
        </div>
      )}
    </div>
  );
} 