import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [content, partners, programs] = await Promise.all([
      prisma.partnersPageContent.findFirst(),
      prisma.partner.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.collaborativeProgram.findMany({ orderBy: { createdAt: 'desc' } }),
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
        partners: partners.map(p => ({
          id: p.id,
          nameAr: p.nameAr,
          nameFr: p.nameFr,
          descriptionAr: p.descriptionAr,
          descriptionFr: p.descriptionFr,
          logo: p.logo,
          website: p.website,
          type: p.type,
        })),
        programs: programs.map(pr => ({
          id: pr.id,
          titleAr: pr.titleAr,
          titleFr: pr.titleFr,
          descriptionAr: pr.descriptionAr,
          descriptionFr: pr.descriptionFr,
          partnerNameAr: pr.partnerNameAr,
          partnerNameFr: pr.partnerNameFr,
        })),
      }
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = body.content as {
      pageTitleAr: string; pageTitleFr: string;
      pageDescriptionAr: string; pageDescriptionFr: string;
    } | null;
    const partners = (body.partners || []) as Array<{
      nameAr: string; nameFr: string; descriptionAr: string; descriptionFr: string;
      logo: string; website?: string | null; type: string;
    }>;
    const programs = (body.programs || []) as Array<{
      titleAr: string; titleFr: string; descriptionAr: string; descriptionFr: string;
      partnerNameAr: string; partnerNameFr: string;
    }>;

    await prisma.$transaction(async (tx) => {
      if (content) {
        const existing = await tx.partnersPageContent.findFirst();
        if (existing) {
          await tx.partnersPageContent.update({
            where: { id: existing.id },
            data: {
              pageTitleAr: content.pageTitleAr,
              pageTitleFr: content.pageTitleFr,
              pageDescriptionAr: content.pageDescriptionAr,
              pageDescriptionFr: content.pageDescriptionFr,
            }
          });
        } else {
          await tx.partnersPageContent.create({
            data: {
              pageTitleAr: content.pageTitleAr,
              pageTitleFr: content.pageTitleFr,
              pageDescriptionAr: content.pageDescriptionAr,
              pageDescriptionFr: content.pageDescriptionFr,
            }
          });
        }
      }

      await tx.partner.deleteMany({});
      if (partners.length > 0) {
        await tx.partner.createMany({ data: partners });
      }

      await tx.collaborativeProgram.deleteMany({});
      if (programs.length > 0) {
        await tx.collaborativeProgram.createMany({ data: programs });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving partners:', error);
    return NextResponse.json({ success: false, error: 'Failed to save partners' }, { status: 500 });
  }
}

