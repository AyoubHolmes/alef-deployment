import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { WorkshopStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (type === 'categories') {
      const categories = await prisma.workshopCategory.findMany({
        orderBy: {
          createdAt: 'asc'
        }
      });

      return NextResponse.json({
        success: true,
        data: categories
      });
    } else if (type === 'workshops') {
      const status = searchParams.get('status') as WorkshopStatus | null;
      const categoryId = searchParams.get('categoryId');

      const where: any = {};
      if (status) where.status = status;
      if (categoryId) where.categoryId = parseInt(categoryId);

      const workshops = await prisma.workshop.findMany({
        where,
        include: {
          category: true
        },
        orderBy: [
          { status: 'asc' },
          { createdAt: 'desc' }
        ]
      });

      return NextResponse.json({
        success: true,
        data: workshops
      });
    } else {
      // Return both categories and workshops
      const [categories, workshops] = await Promise.all([
        prisma.workshopCategory.findMany({
          orderBy: {
            createdAt: 'asc'
          }
        }),
        prisma.workshop.findMany({
          include: {
            category: true
          },
          orderBy: [
            { status: 'asc' },
            { createdAt: 'desc' }
          ]
        })
      ]);

      return NextResponse.json({
        success: true,
        data: {
          categories,
          workshops
        }
      });
    }
  } catch (error) {
    console.error('Error fetching educational activities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch educational activities'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body.type;

    if (type === 'category') {
      const category = await prisma.workshopCategory.create({
        data: {
          titleAr: body.titleAr,
          titleFr: body.titleFr,
          icon: body.icon,
          descriptionAr: body.descriptionAr,
          descriptionFr: body.descriptionFr
        }
      });

      return NextResponse.json({
        success: true,
        data: category
      }, { status: 201 });
    } else if (type === 'workshop') {
      const workshop = await prisma.workshop.create({
        data: {
          titleAr: body.titleAr,
          titleFr: body.titleFr,
          dateAr: body.dateAr,
          dateFr: body.dateFr,
          time: body.time,
          locationAr: body.locationAr,
          locationFr: body.locationFr,
          instructorAr: body.instructorAr,
          instructorFr: body.instructorFr,
          price: body.price,
          status: body.status || WorkshopStatus.OPEN,
          categoryId: body.categoryId,
          examplesAr: body.examplesAr || [],
          examplesFr: body.examplesFr || []
        }
      });

      return NextResponse.json({
        success: true,
        data: workshop
      }, { status: 201 });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid type. Must be "category" or "workshop"'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating educational activity:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create educational activity'
      },
      { status: 500 }
    );
  }
}