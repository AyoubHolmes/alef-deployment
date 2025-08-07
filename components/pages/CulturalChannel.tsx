
'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/cultural-channel/PageHeader';
import VideoList from '@/components/cultural-channel/VideoList';
import VideoPlayer from '@/components/cultural-channel/VideoPlayer';
import { getYouTubeVideos, YouTubeVideo } from '@/data/youtube-videos';

interface AdminVideo {
  id: string;
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  youtubeId: string;
  thumbnail: string;
  publishDate: string;
  category?: string;
}

interface CulturalChannelContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  videos: AdminVideo[];
}

const CulturalChannel = () => {
  const { t, language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [adminContent, setAdminContent] = useState<CulturalChannelContent | null>(null);
  
  // Load admin content
  useEffect(() => {
    const savedContent = localStorage.getItem('culturalChannelContent');
    if (savedContent) {
      setAdminContent(JSON.parse(savedContent));
    }
  }, []);

  // Get videos from admin content or fallback to static data
  const getVideos = () => {
    if (adminContent && adminContent.videos.length > 0) {
      return adminContent.videos.map(video => ({
        id: video.youtubeId,
        title: video.title,
        thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
      }));
    }
    
    // Fallback to static videos
    return getYouTubeVideos();
  };

  const videos = getVideos();
  
  // Set default selected video
  useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      const firstVideoId = adminContent && adminContent.videos.length > 0 
        ? adminContent.videos[0].youtubeId 
        : videos[0].id;
      setSelectedVideo(firstVideoId);
    }
  }, [videos, selectedVideo, adminContent]);

  // Format videos for the current language
  const formattedVideos = videos.map(video => ({
    id: adminContent && adminContent.videos.length > 0 ? video.id : video.id,
    title: video.title[language],
    thumbnail: video.thumbnail
  }));

  // Set the document title based on language
  useEffect(() => {
    if (adminContent && adminContent.pageTitle[language]) {
      document.title = `${adminContent.pageTitle[language]} - جمعية ألف`;
    } else {
      document.title = language === 'ar' 
        ? 'القناة الثقافية - جمعية ألف'
        : 'Chaîne Culturelle - Association ALEF';
    }
  }, [language, adminContent]);

  // Get the current selected video title
  const getCurrentVideoTitle = () => {
    if (adminContent && adminContent.videos.length > 0) {
      const currentVideo = adminContent.videos.find(v => v.youtubeId === selectedVideo);
      return currentVideo ? currentVideo.title[language] : '';
    }
    
    const currentVideo = getYouTubeVideos().find(v => v.id === selectedVideo);
    return currentVideo ? currentVideo.title[language] : '';
  };

  const currentVideoTitle = getCurrentVideoTitle();

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <PageHeader 
          language={language} 
          title={adminContent?.pageTitle[language]}
          description={adminContent?.pageDescription[language]}
        />
        
        {/* Two-column layout: videos on left, player on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video List - Left Column */}
          <div className={`lg:col-span-1 ${language === 'ar' ? 'order-2 lg:order-1' : 'order-1'}`}>
            <VideoList 
              videos={formattedVideos}
              selectedVideo={selectedVideo}
              onSelectVideo={setSelectedVideo}
              language={language}
              t={t}
            />
          </div>
          
          {/* Video Player - Right Column */}
          <div className={`lg:col-span-2 ${language === 'ar' ? 'order-1 lg:order-2' : 'order-2'}`}>
            <VideoPlayer 
              videoId={selectedVideo}
              title={currentVideoTitle}
              language={language}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CulturalChannel;
