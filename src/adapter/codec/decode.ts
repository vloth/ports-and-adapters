import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import { reporter } from 'io-ts-reporters'

/**
 * Creates a function which takes incoming values and decodes them
 * with the given io-ts type,
 * returning the reflecting result.
 *
 * @param type io-ts type to use for decoding incoming values.
 */
export function decode<Output, Input>(type: t.Decoder<Input, Output>): (value: Input) => Output

/**
 * Decodes values using io-ts types, returning the reflecting result.
 *
 * @param type io-ts type to use for decoding the value.
 * @param value Value to decode using the given io-ts type.
 */
export function decode<Output, Input>(type: t.Decoder<Input, Output>, value: Input): Output
export function decode<Output, Input>(
  type: t.Decoder<Input, Output>,
  value?: Input
): ((value: Input) => Output) | Output {
  switch (arguments.length) {
    case 1:
      return decode.bind<null, t.Decoder<Input, Output>, [Input], Output>(null, type)
    default:
      const result = type.decode(value!) // eslint-disable-line
      if (E.isLeft(result)) throw new DecodeError(result)
      return result.right
  }
}

/**
 * Checks whether error was produced by @see decode due to invalid data.
 */
export function isDecodeError(error: unknown): error is DecodeError {
  return error instanceof DecodeError
}

/**
 * Custom error class which is rejected by the @see decode function
 * when decoding fails due to invalid data.
 */
export class DecodeError extends Error {
  public name = '[DECODE ERROR]'

  constructor(either: E.Either<t.Errors, unknown>) {
    super(DecodeError.getErrorMessage(either))
    Object.setPrototypeOf(this, DecodeError.prototype)
  }

  private static getErrorMessage(either: E.Either<t.Errors, unknown>) {
    return `${reporter(either).join('\n')}`
  }
}
