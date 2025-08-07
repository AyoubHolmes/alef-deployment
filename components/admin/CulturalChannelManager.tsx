
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Video, Trash2, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language';

interface Video {
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
  videos: Video[];
}

const CulturalChannelManager: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<CulturalChannelContent>({
    pageTitle: { ar: 'القناة الثقافية والأدبية', fr: 'Chaîne Culturelle et Littéraire' },
    pageDescription: { ar: 'مجموعة من الفيديوهات الثقافية والأدبية', fr: 'Une collection de vidéos culturelles et littéraires' },
    videos: []
  });

  const labels = {
    channelManagement: { ar: 'إدارة القناة الثقافية', fr: 'Gestion de la chaîne culturelle' },
    pageContent: { ar: 'محتوى الصفحة', fr: 'Contenu de la page' },
    videos: { ar: 'الفيديوهات', fr: 'Vidéos' },
    addVideo: { ar: 'إضافة فيديو', fr: 'Ajouter une vidéo' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    youtubeLink: { ar: 'رابط يوتيوب', fr: 'Lien YouTube' },
    category: { ar: 'الفئة (اختيارية)', fr: 'Catégorie (optionnelle)' },
    publishDate: { ar: 'تاريخ النشر', fr: 'Date de publication' },
    saveChanges: { ar: 'حفظ التغييرات', fr: 'Enregistrer les modifications' },
    contentSaved: { ar: 'تم حفظ المحتوى بنجاح', fr: 'Contenu enregistré avec succès' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    remove: { ar: 'إزالة', fr: 'Supprimer' },
    videoAdded: { ar: 'تم إضافة الفيديو', fr: 'Vidéo ajoutée' },
    videoRemoved: { ar: 'تم حذف الفيديو', fr: 'Vidéo supprimée' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  useEffect(() => {
    const savedContent = localStorage.getItem('culturalChannelContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const extractYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const handleSave = () => {
    localStorage.setItem('culturalChannelContent', JSON.stringify(content));
    toast.success(getLabel('contentSaved'));
  };

  const addVideo = () => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: { ar: '', fr: '' },
      description: { ar: '', fr: '' },
      youtubeId: '',
      thumbnail: '',
      publishDate: new Date().toISOString().split('T')[0],
      category: ''
    };
    setContent(prev => ({
      ...prev,
      videos: [...prev.videos, newVideo]
    }));
    toast.success(getLabel('videoAdded'));
  };

  const removeVideo = (id: string) => {
    setContent(prev => ({
      ...prev,
      videos: prev.videos.filter(video => video.id !== id)
    }));
    toast.success(getLabel('videoRemoved'));
  };

  const updateVideo = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      videos: prev.videos.map(video => {
        if (video.id === id) {
          if (field === 'youtubeId') {
            const extractedId = extractYouTubeId(value);
            return {
              ...video,
              [field]: extractedId,
              thumbnail: `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`
            };
          }
          return { ...video, [field]: value };
        }
        return video;
      })
    }));
  };

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {getLabel('channelManagement')}
          </h2>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {getLabel('saveChanges')}
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">{getLabel('pageContent')}</TabsTrigger>
          <TabsTrigger value="videos">{getLabel('videos')}</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ar">{getLabel('arabic')}</TabsTrigger>
              <TabsTrigger value="fr">{getLabel('french')}</TabsTrigger>
            </TabsList>

            <TabsContent value="ar">
              <Card>
                <CardHeader>
                  <CardTitle>{getLabel('pageContent')} - العربية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{getLabel('title')}</Label>
                    <Input
                      value={content.pageTitle.ar}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        pageTitle: { ...prev.pageTitle, ar: e.target.value }
                      }))}
                      placeholder="عنوان القناة الثقافية"
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <Label>{getLabel('description')}</Label>
                    <Textarea
                      value={content.pageDescription.ar}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        pageDescription: { ...prev.pageDescription, ar: e.target.value }
                      }))}
                      placeholder="وصف القناة الثقافية"
                      rows={3}
                      className="text-right"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fr">
              <Card>
                <CardHeader>
                  <CardTitle>{getLabel('pageContent')} - Français</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{getLabel('title')}</Label>
                    <Input
                      value={content.pageTitle.fr}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        pageTitle: { ...prev.pageTitle, fr: e.target.value }
                      }))}
                      placeholder="Titre de la chaîne culturelle"
                    />
                  </div>
                  
                  <div>
                    <Label>{getLabel('description')}</Label>
                    <Textarea
                      value={content.pageDescription.fr}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        pageDescription: { ...prev.pageDescription, fr: e.target.value }
                      }))}
                      placeholder="Description de la chaîne culturelle"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{getLabel('videos')}</h3>
            <Button onClick={addVideo} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              {getLabel('addVideo')}
            </Button>
          </div>

          <div className="space-y-4">
            {content.videos.map((video, index) => (
              <Card key={video.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {language === 'ar' ? `فيديو ${index + 1}` : `Vidéo ${index + 1}`}
                    </CardTitle>
                    <Button
                      onClick={() => removeVideo(video.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="ar" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="ar">{getLabel('arabic')}</TabsTrigger>
                      <TabsTrigger value="fr">{getLabel('french')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="ar" className="space-y-3">
                      <div>
                        <Label>العنوان</Label>
                        <Input
                          value={video.title.ar}
                          onChange={(e) => updateVideo(video.id, 'title', { ...video.title, ar: e.target.value })}
                          placeholder="عنوان الفيديو بالعربية"
                          className="text-right"
                        />
                      </div>
                      <div>
                        <Label>الوصف</Label>
                        <Textarea
                          value={video.description.ar}
                          onChange={(e) => updateVideo(video.id, 'description', { ...video.description, ar: e.target.value })}
                          placeholder="وصف الفيديو بالعربية"
                          rows={2}
                          className="text-right"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="fr" className="space-y-3">
                      <div>
                        <Label>Titre</Label>
                        <Input
                          value={video.title.fr}
                          onChange={(e) => updateVideo(video.id, 'title', { ...video.title, fr: e.target.value })}
                          placeholder="Titre de la vidéo en français"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={video.description.fr}
                          onChange={(e) => updateVideo(video.id, 'description', { ...video.description, fr: e.target.value })}
                          placeholder="Description de la vidéo en français"
                          rows={2}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Youtube className="w-4 h-4" />
                        {getLabel('youtubeLink')}
                      </Label>
                      <Input
                        value={video.youtubeId}
                        onChange={(e) => updateVideo(video.id, 'youtubeId', e.target.value)}
                        placeholder="https://youtube.com/watch?v=... ou ID"
                      />
                    </div>
                    <div>
                      <Label>{getLabel('category')}</Label>
                      <Input
                        value={video.category || ''}
                        onChange={(e) => updateVideo(video.id, 'category', e.target.value)}
                        placeholder={language === 'ar' ? 'أدب، ثقافة، فن...' : 'Littérature, Culture, Art...'}
                      />
                    </div>
                    <div>
                      <Label>{getLabel('publishDate')}</Label>
                      <Input
                        type="date"
                        value={video.publishDate}
                        onChange={(e) => updateVideo(video.id, 'publishDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {video.thumbnail && (
                    <div className="mt-3">
                      <Label>Aperçu</Label>
                      <img 
                        src={video.thumbnail} 
                        alt="Video thumbnail" 
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CulturalChannelManager;
