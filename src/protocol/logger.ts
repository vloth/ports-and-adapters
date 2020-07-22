import pino from 'pino'
import { name } from '../../package.json'

export const logger = pino({ name })
