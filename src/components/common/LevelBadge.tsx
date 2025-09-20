import React from 'react';
import { Crown, Star, Award } from 'lucide-react';

interface LevelBadgeProps {
  level: 'Bronze' | 'Silver' | 'Gold';
  progress?: number;
  showProgress?: boolean;
}

const LevelBadge = ({ level, progress = 0, showProgress = false }: LevelBadgeProps) => {
  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'Bronze':
        return {
          icon: Award,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          progressColor: 'bg-amber-500'
        };
      case 'Silver':
        return {
          icon: Star,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          progressColor: 'bg-gray-500'
        };
      case 'Gold':
        return {
          icon: Crown,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          progressColor: 'bg-yellow-500'
        };
      default:
        return {
          icon: Award,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          progressColor: 'bg-gray-500'
        };
    }
  };

  const config = getLevelConfig(level);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>{level}</span>
      {showProgress && (
        <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${config.progressColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default LevelBadge;