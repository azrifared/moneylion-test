import {
  RouteOptions,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RequestGenericInterface,
  HTTPMethods,
  RouteHandlerMethod,
} from 'fastify'
import { User } from '../entities/User';

export interface Token extends User {
  iat: number;
}

declare module 'fastify' {
  interface FastifyRequest {
    token: Token
  }
}

export interface Route<
  GenericRequest extends RequestGenericInterface = RequestGenericInterface
> extends RouteOptions<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    GenericRequest
  > {
  method: HTTPMethods
  url: string
  handler: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    GenericRequest
  >
}

