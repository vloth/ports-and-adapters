/** Types generated for queries found in "src/core/todo/storage.adapter/sql/todo.sql" */
import { PreparedQuery } from '@pgtyped/query'

/** 'GetAll' parameters type */
export type IGetAllParams = void

/** 'GetAll' return type */
export interface IGetAllResult {
  id: number
  description: string
  done: boolean
  date: Date | null
}

/** 'GetAll' query type */
export interface IGetAllQuery {
  params: IGetAllParams
  result: IGetAllResult
}

const getAllIR: any = {
  name: 'getAll',
  params: [],
  usedParamSet: {},
  statement: { body: 'select * from todo', loc: { a: 19, b: 36, line: 2, col: 0 } }
}

/**
 * Query generated from SQL:
 * ```
 * select * from todo
 * ```
 */
export const getAll = new PreparedQuery<IGetAllParams, IGetAllResult>(getAllIR)

/** 'Get' parameters type */
export interface IGetParams {
  id: number | null | void
}

/** 'Get' return type */
export interface IGetResult {
  id: number
  description: string
  done: boolean
  date: Date | null
}

/** 'Get' query type */
export interface IGetQuery {
  params: IGetParams
  result: IGetResult
}

const getIR: any = {
  name: 'get',
  params: [
    {
      name: 'id',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 87, b: 88, line: 5, col: 31 }] }
    }
  ],
  usedParamSet: { id: true },
  statement: { body: 'select * from todo where id = :id', loc: { a: 56, b: 88, line: 5, col: 0 } }
}

/**
 * Query generated from SQL:
 * ```
 * select * from todo where id = :id
 * ```
 */
export const get = new PreparedQuery<IGetParams, IGetResult>(getIR)

/** 'Update' parameters type */
export interface IUpdateParams {
  done: boolean | null | void
  description: string | null | void
  date: Date | null | void
  id: number | null | void
}

/** 'Update' return type */
export type IUpdateResult = void

/** 'Update' query type */
export interface IUpdateQuery {
  params: IUpdateParams
  result: IUpdateResult
}

const updateIR: any = {
  name: 'update',
  params: [
    {
      name: 'done',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 133, b: 136, line: 9, col: 10 }] }
    },
    {
      name: 'description',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 152, b: 162, line: 9, col: 29 }] }
    },
    {
      name: 'date',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 171, b: 174, line: 9, col: 48 }] }
    },
    {
      name: 'id',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 186, b: 187, line: 10, col: 10 }] }
    }
  ],
  usedParamSet: { done: true, description: true, date: true, id: true },
  statement: {
    body: 'update todo\nset done=:done, description=:description, date=:date\nwhere id=:id',
    loc: { a: 111, b: 187, line: 8, col: 0 }
  }
}

/**
 * Query generated from SQL:
 * ```
 * update todo
 * set done=:done, description=:description, date=:date
 * where id=:id
 * ```
 */
export const update = new PreparedQuery<IUpdateParams, IUpdateResult>(updateIR)

/** 'Insert' parameters type */
export interface IInsertParams {
  description: string | null | void
  done: boolean | null | void
  date: Date | null | void
}

/** 'Insert' return type */
export interface IInsertResult {
  id: number
}

/** 'Insert' query type */
export interface IInsertQuery {
  params: IInsertParams
  result: IInsertResult
}

const insertIR: any = {
  name: 'insert',
  params: [
    {
      name: 'description',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 261, b: 271, line: 14, col: 9 }] }
    },
    {
      name: 'done',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 275, b: 278, line: 14, col: 23 }] }
    },
    {
      name: 'date',
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 282, b: 285, line: 14, col: 30 }] }
    }
  ],
  usedParamSet: { description: true, done: true, date: true },
  statement: {
    body:
      'insert into todo(description, done, date)\nvalues (:description, :done, :date) returning id',
    loc: { a: 210, b: 299, line: 13, col: 0 }
  }
}

/**
 * Query generated from SQL:
 * ```
 * insert into todo(description, done, date)
 * values (:description, :done, :date) returning id
 * ```
 */
export const insert = new PreparedQuery<IInsertParams, IInsertResult>(insertIR)
