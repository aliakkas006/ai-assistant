import { Injectable } from '@nestjs/common';
import { eq, and, desc, sql } from 'drizzle-orm';
import { db } from '@repo/db';
import { professionals } from '@repo/db';
import { NLPService } from 'src/utils/nlp.utils';

@Injectable()
export class SearchService {
  constructor(private readonly nlpService: NLPService) {}

  /**
   * Finds the best professionals based on the user's query.
   * This method performs the following steps:
   * 1. Extracts and normalizes keywords (e.g., profession and location) from the query using NLP.
   * 2. Queries the database to find professionals matching the extracted criteria.
   * 3. Returns the top 5 professionals sorted by ranking, rating, and total appointments.
   *
   * @param query - The user's search query (e.g., "Find me the best doctor in Uttara Dhaka").
   * @returns A list of professionals matching the query criteria.
   */
  async findBestProfessional(query: string) {
    const { category, location } = await this.nlpService.extractKeywords(query);

    // Fetch matching professionals from the database
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

    return results;
  }
}
