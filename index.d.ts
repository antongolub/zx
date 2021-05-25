// Copyright 2021 Google LLC
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ChildProcess} from 'child_process'
import {Readable, Writable} from 'stream'
import {createReadStream, createWriteStream, promises as _fs} from 'fs'
import * as _os from 'os'
import * as _chalk from 'chalk'

interface $ {
  (pieces: TemplateStringsArray, ...args: any[]): ProcessPromise<ProcessOutput>

  verbose: boolean
  shell: string
  cwd: string
  prefix: string
  quote: (input: string) => string
}

export interface ProcessPromise<T> extends Promise<T> {
  child: ChildProcess
  readonly stdin: Writable
  readonly stdout: Readable
  readonly stderr: Readable
  readonly exitCode: Promise<number>

  pipe(dest: ProcessPromise<ProcessOutput> | Writable): ProcessPromise<ProcessOutput>
}

export class ProcessOutput {
  readonly exitCode: number
  readonly stdout: string
  readonly stderr: string

  toString(): string
}

export type QuestionOptions = { choices: string[] }

type cd = (path: string) => void
type nothrow = (p: ProcessPromise<ProcessOutput>) => ProcessPromise<ProcessOutput>
type sleep =(ms: number) => Promise<void>
type question = (query?: string, options?: QuestionOptions) => Promise<string>
type fs = typeof _fs & {
  createWriteStream: typeof createWriteStream
  createReadStream: typeof createReadStream
}

export const $: $
export const cd: cd
export const nothrow: nothrow
export const sleep: sleep
export const question: question
export const chalk: typeof _chalk
export const fs: fs
export const os: typeof _os

declare global {
  const $: $
  const cd: cd
  const nothrow: nothrow
  const sleep: sleep
  const question: question
  const chalk: typeof _chalk
  const fs: fs
  const os: typeof _os
}
