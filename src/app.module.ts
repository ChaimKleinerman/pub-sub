import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PingPongsApp } from './pingpong/ping-pong.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      driver: ApolloDriver,

      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),

    
    PingPongsApp
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        const options = {
          host: 'localhost',
          port: 6379
        };
    
        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
  ],
})
export class AppModule {}