import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { NLPService } from 'src/utils/nlp.utils';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SearchController],
  providers: [SearchService, NLPService],
})
export class SearchModule {}
