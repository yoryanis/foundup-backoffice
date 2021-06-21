import { environment } from '../../environments/environment';
import { Endpoint } from './endpoints';

export class Api {
  public static PRODUCTION: boolean = environment.production;
  public static DEBUG = false;
  public static Endpoints = Endpoint;

  // Authentication
  public static AUTH = {
    KEYS: {
      token: 'token',
      urlBeforExpelling: 'urlBeforExpelling',
    },
  };
}
