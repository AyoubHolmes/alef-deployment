
'use client'

import React from 'react';
import { Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoItem from './VideoItem';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

interface VideoListProps {
  videos: YouTubeVideo[];
  selectedVideo: string;
  onSelectVideo: (id: string) => void;
  language: 'ar' | 'fr';
  t: (key: string) => string;
}

const VideoList = ({ videos, selectedVideo, onSelectVideo, language, t }: VideoListProps) => {
  return (
    <div>
      <h2 className={`text-xl font-semibold mb-6 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
        {t('allVideos')}
      </h2>
      
      <div className="space-y-4">
        {videos.map((video) => (
          <VideoItem 
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            isSelected={selectedVideo === video.id}
            onClick={onSelectVideo}
            language={language}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          variant="default"
          className="bg-[#FF0000] hover:bg-[#FF0000]/90"
          onClick={() => window.open('https://www.youtube.com/@artslitteratures/videos', '_blank')}
        >
          <Youtube className="mr-2" />
          {language === 'ar' ? 'زيارة قناتنا على اليوتيوب' : 'Visiter notre chaîne YouTube'}
        </Button>
      </div>
    </div>
  );
};

export default VideoList;
