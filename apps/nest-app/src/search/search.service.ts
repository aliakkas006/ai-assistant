import { Injectable } from '@nestjs/common';
import { eq, and, desc, sql } from 'drizzle-orm';
import { db } from '@repo/db';
import { professionals } from '@repo/db';
import { NLPService } from 'src/utils/nlp.utils';

@Injectable()
export class SearchService {
  constructor(private readonly nlpService: NLPService) {}

  async findBestProfessional(query: string) {
    // Extract Keywords & Normalize Using AI & NLP
    const { category, location } = await this.nlpService.extractKeywords(query);

    // Fetch Matching Professionals from Database
    const results = await db
      .select()
      .from(professionals)
      .where(
        and(
          eq(professionals.category, category),
          sql`${professionals.zone} @> ARRAY[${location}]::text[]`,
        ),
      )
      .orderBy(
        desc(professionals.ranking),
        desc(professionals.rating),
        desc(professionals.totalAppointments),
      )
      .limit(5);

    console.log(`Found ${results.length} professionals for query: ${query}`);
    console.log(results);

    return results;
  }
}
