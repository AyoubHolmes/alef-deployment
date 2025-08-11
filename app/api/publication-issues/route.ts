import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Magazine } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const magazine = searchParams.get('magazine') as Magazine | null;

    const where = magazine ? { magazine } : {};

    const issues = await prisma.publicationIssue.findMany({
      where,
      orderBy: [
        { magazine: 'asc' },
        { number: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('Error fetching publication issues:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publication issues' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const issue = await prisma.publicationIssue.create({
      data: {
        magazine: body.magazine,
        number: parseInt(body.number),
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        date: new Date(body.date),
        image: body.image,
        featuredAr: body.featuredAr,
        featuredFr: body.featuredFr,
        contentAr: body.contentAr,
        contentFr: body.contentFr
      }
    });

    return NextResponse.json({
      success: true,
      data: issue
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating publication issue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create publication issue' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    if (updateData.number) {
      updateData.number = parseInt(updateData.number);
    }

    const issue = await prisma.publicationIssue.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Error updating publication issue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update publication issue' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.publicationIssue.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Publication issue deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting publication issue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete publication issue' },
      { status: 500 }
    );
  }
}