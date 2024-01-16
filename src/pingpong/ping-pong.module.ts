import { Module } from "@nestjs/common";
import { PingPongResolvers } from "./ping-pong.resolvers";
import { PubSub } from "graphql-subscriptions";

@Module({
    // ...
    providers: [
      PingPongResolvers,
      {
        provide: 'PUB_SUB',
        useValue: new PubSub(),
      },
    ],
  })
  export class PingPongsApp {}