import React from 'react';

// Custom Loader Component for Raddha
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  showName?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  fullScreen = false,
  showName = true 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const logoSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Spinning ring */}
          <div className={`${sizeClasses[size]} border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin`} />
          
          {/* Company logo "R" in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${logoSizes[size]} font-bold text-orange-500`}>
              R
            </span>
          </div>
        </div>

        {/* Company name */}
        {showName && (
          <div className="text-center">
            <h2 className={`font-bold text-orange-500 tracking-wide ${
              size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl'
            }`}>
              RADDHA
            </h2>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-150" />
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;