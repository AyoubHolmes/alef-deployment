import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ArticleCategory } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        category: ArticleCategory.EDUCATION,
        published: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching education articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch education articles'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const article = await prisma.article.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        authorAr: body.authorAr,
        authorFr: body.authorFr,
        translatorAr: body.translatorAr,
        translatorFr: body.translatorFr,
        date: new Date(body.date),
        category: ArticleCategory.EDUCATION,
        categoryLabelAr: 'تربية',
        categoryLabelFr: 'Éducation',
        image: body.image,
        excerptAr: body.excerptAr,
        excerptFr: body.excerptFr,
        contentAr: body.contentAr,
        contentFr: body.contentFr,
        additionalImages: body.additionalImages || [],
        published: body.published !== false
      }
    });

    return NextResponse.json({
      success: true,
      data: article
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating education article:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create education article'
      },
      { status: 500 }
    );
  }
}