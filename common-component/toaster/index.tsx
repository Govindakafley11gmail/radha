// toaster.tsx - Complete component with inline styles
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

// Status Notification Component
interface StatusNotificationProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  description?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export const StatusNotification: React.FC<StatusNotificationProps> = ({
  type,
  message,
  description,
  onClose,
  autoClose = true,
  duration = 5000,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  if (!isVisible) return null;

  const configs = {
    success: {
      icon: <CheckCircle className="w-6 h-6" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconColor: 'text-green-500',
      textColor: 'text-green-800',
      progressColor: 'bg-green-500'
    },
    error: {
      icon: <XCircle className="w-6 h-6" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconColor: 'text-red-500',
      textColor: 'text-red-800',
      progressColor: 'bg-red-500'
    },
    warning: {
      icon: <AlertCircle className="w-6 h-6" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-800',
      progressColor: 'bg-yellow-500'
    }
  };

  const config = configs[type];

  const positionClasses = {
    'top-right': '-top-30 right-0',
    'top-center': '-top-30 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
  };

  return (
    <>
      {/* Inline styles for animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-slideOut {
          animation: slideOut 0.3s ease-in forwards;
        }

        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>

      <div
        className={`fixed ${positionClasses[position]} z-50 w-96 max-w-[calc(100vw-3rem)] ${
          isExiting ? 'animate-slideOut' : 'animate-slideIn'
        }`}
      >
        <div
          className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className={config.iconColor}>{config.icon}</div>
              <div className="flex-1">
                <h3 className={`font-semibold ${config.textColor} text-sm`}>
                  {message}
                </h3>
                {description && (
                  <p className={`mt-1 text-sm ${config.textColor} opacity-80`}>
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className={`${config.iconColor} hover:opacity-70 transition-opacity`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {autoClose && (
            <div className="h-1 bg-gray-200">
              <div
                className={`h-full ${config.progressColor} animate-progress`}
                style={{ animationDuration: `${duration}ms` }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};