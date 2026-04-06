export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <style jsx>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(to top, rgba(249, 115, 22, 0.1), transparent);
          animation: wave-animation 8s ease-in-out infinite;
        }
        
        .wave1 {
          animation-delay: 0s;
          opacity: 0.3;
        }
        
        .wave2 {
          animation-delay: 2s;
          opacity: 0.2;
        }
        
        .wave3 {
          animation-delay: 4s;
          opacity: 0.15;
        }
        
        @keyframes wave-animation {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25%) translateY(-10px);
          }
          100% {
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
