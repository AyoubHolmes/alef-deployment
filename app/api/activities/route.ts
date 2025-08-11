import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all types of activities
    const [artExhibitions, workshops, literaryEvents] = await Promise.all([
      prisma.artExhibition.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.workshop.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.literaryEvent.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    // Transform data to unified format
    const activities = [
      ...artExhibitions.map(item => ({
        id: `art-${item.id}`,
        title: { ar: item.titleAr, fr: item.titleFr },
        description: { ar: item.descriptionAr, fr: item.descriptionFr },
        category: 'art-exhibitions',
        type: 'exhibition',
        status: item.status.toLowerCase(),
        startDate: item.createdAt.toISOString().split('T')[0],
        endDate: item.createdAt.toISOString().split('T')[0],
        location: { ar: item.locationAr, fr: item.locationFr },
        participants: 0,
        artist: { ar: item.artistAr, fr: item.artistFr },
        dates: { ar: item.datesAr, fr: item.datesFr }
      })),
      ...workshops.map(item => ({
        id: `workshop-${item.id}`,
        title: { ar: item.titleAr, fr: item.titleFr },
        description: { ar: item.category.descriptionAr, fr: item.category.descriptionFr },
        category: 'educational-activities',
        type: 'workshop',
        status: item.status.toLowerCase(),
        startDate: item.createdAt.toISOString().split('T')[0],
        endDate: item.createdAt.toISOString().split('T')[0],
        location: { ar: item.locationAr, fr: item.locationFr },
        participants: 0,
        instructor: { ar: item.instructorAr, fr: item.instructorFr },
        price: item.price,
        time: item.time
      })),
      ...literaryEvents.map(item => ({
        id: `literary-${item.id}`,
        title: { ar: item.titleAr, fr: item.titleFr },
        description: { ar: item.descriptionAr, fr: item.descriptionFr },
        category: 'literary-gatherings',
        type: 'event',
        status: item.status.toLowerCase(),
        startDate: item.createdAt.toISOString().split('T')[0],
        endDate: item.createdAt.toISOString().split('T')[0],
        location: { ar: item.locationAr, fr: item.locationFr },
        participants: 0,
        dates: { ar: item.dateAr, fr: item.dateFr }
      }))
    ];

    return NextResponse.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, type, ...activityData } = body;

    let result;

    switch (category) {
      case 'art-exhibitions':
        result = await prisma.artExhibition.create({
          data: {
            titleAr: activityData.titleAr,
            titleFr: activityData.titleFr,
            artistAr: activityData.artistAr,
            artistFr: activityData.artistFr,
            datesAr: activityData.datesAr,
            datesFr: activityData.datesFr,
            locationAr: activityData.locationAr,
            locationFr: activityData.locationFr,
            descriptionAr: activityData.descriptionAr,
            descriptionFr: activityData.descriptionFr,
            image: activityData.image || '',
            status: activityData.status?.toUpperCase() || 'UPCOMING'
          }
        });
        break;

      case 'educational-activities':
        result = await prisma.workshop.create({
          data: {
            titleAr: activityData.titleAr,
            titleFr: activityData.titleFr,
            dateAr: activityData.dateAr,
            dateFr: activityData.dateFr,
            time: activityData.time,
            locationAr: activityData.locationAr,
            locationFr: activityData.locationFr,
            instructorAr: activityData.instructorAr,
            instructorFr: activityData.instructorFr,
            price: activityData.price,
            status: activityData.status?.toUpperCase() || 'OPEN',
            categoryId: activityData.categoryId,
            examplesAr: activityData.examplesAr || [],
            examplesFr: activityData.examplesFr || []
          }
        });
        break;

      case 'literary-gatherings':
        result = await prisma.literaryEvent.create({
          data: {
            titleAr: activityData.titleAr,
            titleFr: activityData.titleFr,
            dateAr: activityData.dateAr,
            dateFr: activityData.dateFr,
            locationAr: activityData.locationAr,
            locationFr: activityData.locationFr,
            descriptionAr: activityData.descriptionAr,
            descriptionFr: activityData.descriptionFr,
            image: activityData.image || '',
            status: activityData.status?.toUpperCase() || 'UPCOMING'
          }
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid activity category' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, category } = body;

    const [prefix, actualId] = id.split('-');
    const numericId = parseInt(actualId);

    switch (prefix) {
      case 'art':
        await prisma.artExhibition.delete({
          where: { id: numericId }
        });
        break;
      case 'workshop':
        await prisma.workshop.delete({
          where: { id: numericId }
        });
        break;
      case 'literary':
        await prisma.literaryEvent.delete({
          where: { id: numericId }
        });
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid activity type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
}