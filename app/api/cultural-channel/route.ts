import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [content, videos] = await Promise.all([
      prisma.culturalChannelContent.findFirst(),
      prisma.culturalChannelVideo.findMany({
        orderBy: { publishDate: 'desc' }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        content: content ? {
          pageTitleAr: content.pageTitleAr,
          pageTitleFr: content.pageTitleFr,
          pageDescriptionAr: content.pageDescriptionAr,
          pageDescriptionFr: content.pageDescriptionFr,
        } : null,
        videos: videos.map(v => ({
          id: v.id,
          youtubeId: v.youtubeId,
          titleAr: v.titleAr,
          titleFr: v.titleFr,
          descriptionAr: v.descriptionAr,
          descriptionFr: v.descriptionFr,
          thumbnail: v.thumbnail || null,
          publishDate: v.publishDate.toISOString(),
          category: v.category || null,
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching cultural channel data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch cultural channel data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = body.content as {
      pageTitleAr: string;
      pageTitleFr: string;
      pageDescriptionAr: string;
      pageDescriptionFr: string;
    } | null;
    const videos = (body.videos || []) as Array<{
      youtubeId: string;
      titleAr: string;
      titleFr: string;
      descriptionAr: string;
      descriptionFr: string;
      thumbnail?: string | null;
      publishDate: string; // ISO date string
      category?: string | null;
    }>;

    await prisma.$transaction(async (tx) => {
      if (content) {
        const existing = await tx.culturalChannelContent.findFirst();
        if (existing) {
          await tx.culturalChannelContent.update({
            where: { id: existing.id },
            data: {
              pageTitleAr: content.pageTitleAr,
              pageTitleFr: content.pageTitleFr,
              pageDescriptionAr: content.pageDescriptionAr,
              pageDescriptionFr: content.pageDescriptionFr,
            }
          });
        } else {
          await tx.culturalChannelContent.create({
            data: {
              pageTitleAr: content.pageTitleAr,
              pageTitleFr: content.pageTitleFr,
              pageDescriptionAr: content.pageDescriptionAr,
              pageDescriptionFr: content.pageDescriptionFr,
            }
          });
        }
      }

      // Replace all videos with the provided list (simple sync strategy)
      await tx.culturalChannelVideo.deleteMany({});
      if (videos.length > 0) {
        await tx.culturalChannelVideo.createMany({
          data: videos.map(v => ({
            youtubeId: v.youtubeId,
            titleAr: v.titleAr,
            titleFr: v.titleFr,
            descriptionAr: v.descriptionAr,
            descriptionFr: v.descriptionFr,
            thumbnail: v.thumbnail || null,
            publishDate: new Date(v.publishDate),
            category: v.category || null,
          }))
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving cultural channel data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save cultural channel data' }, { status: 500 });
  }
}

