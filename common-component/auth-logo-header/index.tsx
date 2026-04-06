import { useState, ButtonHTMLAttributes } from "react";

interface AuthLogoHeaderProps  {
    Title?: string;
    subTitle?: string;
}

export const AuthLogoHeader = ({
  Title,
  subTitle,

  ...props
}: AuthLogoHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex justify-center items-center text-2xl font-bold mx-auto mb-4 animate-bounce-slow">
        <span className="text-white font-bold tracking-wide">RA</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{Title}</h1>
      <p className="text-gray-600">{subTitle}</p>

       {/* Bounce animation */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
