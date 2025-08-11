import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ArticleCategory } from '@prisma/client';

function getCategoryLabel(category: string, language: 'ar' | 'fr'): string {
  const labels = {
    VISUAL_ARTS: {
      ar: 'الفنون البصرية',
      fr: 'Arts Visuels'
    },
    LITERARY_THOUGHT: {
      ar: 'الفكر الأدبي',
      fr: 'Pensée Littéraire'
    },
    PROEMES: {
      ar: 'بروايم',
      fr: 'Proèmes'
    },
    EDUCATION: {
      ar: 'التعليم',
      fr: 'Éducation'
    }
  };
  
  return labels[category as keyof typeof labels]?.[language] || category;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as ArticleCategory | null;
    const published = searchParams.get('published');

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (published !== null) {
      where.published = published === 'true';
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
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
        translatorAr: body.translatorAr || null,
        translatorFr: body.translatorFr || null,
        date: body.date ? new Date(body.date) : new Date(),
        category: body.category,
        categoryLabelAr: body.categoryLabelAr || getCategoryLabel(body.category, 'ar'),
        categoryLabelFr: body.categoryLabelFr || getCategoryLabel(body.category, 'fr'),
        image: body.image || '',
        excerptAr: body.excerptAr || '',
        excerptFr: body.excerptFr || '',
        contentAr: body.contentAr || '',
        contentFr: body.contentFr || '',
        additionalImages: body.additionalImages || [],
        published: body.published || false
      }
    });

    return NextResponse.json({
      success: true,
      data: article
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Clean the updateData to handle optional fields properly
    const cleanData: any = {
      titleAr: updateData.titleAr,
      titleFr: updateData.titleFr,
      authorAr: updateData.authorAr,
      authorFr: updateData.authorFr,
      translatorAr: updateData.translatorAr || null,
      translatorFr: updateData.translatorFr || null,
      category: updateData.category,
      categoryLabelAr: updateData.categoryLabelAr || getCategoryLabel(updateData.category, 'ar'),
      categoryLabelFr: updateData.categoryLabelFr || getCategoryLabel(updateData.category, 'fr'),
      image: updateData.image || '',
      excerptAr: updateData.excerptAr || '',
      excerptFr: updateData.excerptFr || '',
      contentAr: updateData.contentAr || '',
      contentFr: updateData.contentFr || '',
      additionalImages: updateData.additionalImages || [],
      published: updateData.published || false
    };

    if (updateData.date) {
      cleanData.date = new Date(updateData.date);
    }

    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: cleanData
    });

    return NextResponse.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.article.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}