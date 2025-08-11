
'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/cultural-channel/PageHeader';
import VideoList from '@/components/cultural-channel/VideoList';
import VideoPlayer from '@/components/cultural-channel/VideoPlayer';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Load content from API (fallback to static if none)
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const res = await fetch('/api/cultural-channel', { cache: 'no-store' });
        const json = await res.json();
        if (json?.success) {
          const content = json.data.content as (null | {
            pageTitleAr: string; pageTitleFr: string;
            pageDescriptionAr: string; pageDescriptionFr: string;
          });
          const videos = (json.data.videos || []) as Array<{
            id: number; youtubeId: string; titleAr: string; titleFr: string; thumbnail?: string | null;
          }>;
          if (content || (videos && videos.length > 0)) {
            setAdminContent({
              pageTitle: {
                ar: content?.pageTitleAr || 'القناة الثقافية والأدبية',
                fr: content?.pageTitleFr || 'Chaîne Culturelle et Littéraire'
              },
              pageDescription: {
                ar: content?.pageDescriptionAr || 'مجموعة من الفيديوهات الثقافية والأدبية',
                fr: content?.pageDescriptionFr || 'Une collection de vidéos culturelles et littéraires'
              },
              videos: videos.map(v => ({
                id: String(v.id),
                title: { ar: v.titleAr, fr: v.titleFr },
                description: { ar: '', fr: '' },
                youtubeId: v.youtubeId,
                thumbnail: v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
                publishDate: '',
                category: ''
              }))
            });
          }
        } else {
          setErrorMessage(language === 'ar' ? 'فشل في تحميل القناة' : 'Échec du chargement de la chaîne');
        }
      } catch (e) {
        setErrorMessage(language === 'ar' ? 'خطأ في الاتصال' : 'Erreur de connexion');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [language]);

  // Derive currently available videos strictly from API content (no mock fallback)
  const videos = (adminContent?.videos || []).map(video => ({
    id: video.youtubeId,
    title: video.title,
    thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
  }));
  
  // Set default selected video
  useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      const firstVideoId = adminContent && adminContent.videos.length > 0 
        ? adminContent.videos[0].youtubeId 
        : '';
      if (firstVideoId) setSelectedVideo(firstVideoId);
    }
  }, [videos, selectedVideo, adminContent]);

  // Format videos for the current language
  const formattedVideos = videos.map(video => ({
    id: video.id,
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
    const currentVideo = adminContent?.videos.find(v => v.youtubeId === selectedVideo);
    return currentVideo ? currentVideo.title[language] : '';
  };

  const currentVideoTitle = getCurrentVideoTitle();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (errorMessage) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{errorMessage}</div>
          </div>
        </div>
      </MainLayout>
    );
  }

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
