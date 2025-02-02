import { Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { WordNet } from 'natural';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NLPService {
  private readonly logger = new Logger(NLPService.name);
  private model: ChatOpenAI;
  private wordNet: WordNet;

  constructor(private readonly configService: ConfigService) {
    this.model = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4',
    });

    // Initialize WordNet for synonym lookup
    this.wordNet = new WordNet();
  }

  /**
   * Extracts keywords (category and location) from a user query using OpenAI API.
   * @param query - The user's query (e.g., "Find me the best doc in Uttara Dhaka").
   * @returns An object containing the normalized category and location.
   */
  async extractKeywords(
    query: string,
  ): Promise<{ category: string; location: string }> {
    try {
      const prompt = `
        Analyze the following query and extract key entities:
        - Identify the profession type (normalize: "doc" → "doctor", "medic" → "physician").
        - Identify the location (e.g., "Uttara, Dhaka").
        
        Query: "${query}"
        Response Format: { "category": "profession", "location": "city, country" }
      `;

      // Call OpenAI to analyze the query
      const response: any = await this.model.invoke(prompt);
      this.logger.log(`OpenAI response: ${response}`);

      if (!response) {
        throw new Error('Failed to extract keywords from the query.');
      }

      // Parse and validate the response
      const parsedResponse = JSON.parse(response) as {
        category: string;
        location: string;
      };
      const { category, location } = parsedResponse;

      // Normalize the category using WordNet
      const normalizedCategory = await this.getSynonym(category);

      return { category: normalizedCategory, location };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error extracting keywords: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Error extracting keywords: ${error}`);
      }
      throw new Error('Failed to extract keywords from the query.');
    }
  }

  /**
   * Finds the synonym of a word using WordNet.
   * @param word - The word to find a synonym for.
   * @returns The normalized word (synonym or the original word if no synonym is found).
   */
  private async getSynonym(word: string): Promise<string> {
    return new Promise((resolve) => {
      this.wordNet.lookup(word, (results) => {
        if (results.length > 0) {
          resolve(results[0].lemma);
        } else {
          resolve(word);
        }
      });
    });
  }
}
