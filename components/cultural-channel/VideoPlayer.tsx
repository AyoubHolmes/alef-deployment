
import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  language: 'ar' | 'fr';
}

const VideoPlayer = ({ videoId, title, language }: VideoPlayerProps) => {
  return (
    <div>
      <h2 className={`text-xl font-semibold mb-6 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
        {language === 'ar' ? 'الفيديو المميز' : 'Vidéo en vedette'}
      </h2>
      
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <div className="w-full h-0 pb-[56.25%] relative">
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
        {title}
      </h3>
    </div>
  );
};

export default VideoPlayer;
