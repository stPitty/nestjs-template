import { Params } from 'nestjs-pino/params';

export type IPinoLevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace';

export const pinoConfig = (options: { level: IPinoLevel }): Params => {
  const { level } = options;

  return {
    pinoHttp: {
      customSuccessMessage: function (req, res) {
        return `${req.method} ${req.url} complite with ${res.statusCode}`;
      },
      customErrorMessage: function (req, res, err) {
        return `${req.method} ${req.url} complite with ${res.statusCode}`;
      },

      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level,
            options: {
              levelFirst: true,
              singleLine: true,
              colorize: true,
              colorizeObjects: true,
              messageFormat: '[{context}] {msg} {query}',
            },
          },
        ],
      },
      level,
    },
  };
};
