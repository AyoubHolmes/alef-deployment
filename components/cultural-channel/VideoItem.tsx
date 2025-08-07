
import React from 'react';
import { Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoItemProps {
  id: string;
  title: string;
  thumbnail: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  language: 'ar' | 'fr';
}

const VideoItem = ({ id, title, thumbnail, isSelected, onClick, language }: VideoItemProps) => {
  return (
    <div 
      onClick={() => onClick(id)}
      className={cn(
        "flex cursor-pointer rounded-md overflow-hidden border hover:shadow-md transition-shadow",
        isSelected && "border-[#2D439A] bg-blue-50"
      )}
    >
      <div className="w-1/3 relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center",
          isSelected ? "opacity-0" : "opacity-0 hover:opacity-100 transition-opacity"
        )}>
          <Youtube size={24} className="text-white" />
        </div>
      </div>
      <div className="w-2/3 p-3">
        <h3 className={`text-sm font-medium line-clamp-2 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default VideoItem;
