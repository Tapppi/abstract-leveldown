interface AbstractLevelDOWN<K=any, V=any, O=any, PO=any, GO=any, DO=any, IO=any, BO=any> {
  open(callback: (err?: any) => void): void;
  open(options: O, callback: (err?: any) => void): void;

  close(callback: (err?: any) => void): void;

  get(key: K, callback: (err: any, value: V) => any): void;
  get(key: K, options: GO, callback: (err: any, value: V) => any): void;

  put(key: K, value: V, callback: (err: any) => any): void;
  put(key: K, value: V, options: PO, callback: (err: any) => any): void;

  del(key: K, callback: (err: any) => any): void;
  del(key: K, options: DO, callback: (err: any) => any): void;

  batch(): AbstractChainedBatch<K, V, BO>;
  batch(array: Batch<K, V>[], callback: (err: any) => any): AbstractChainedBatch<K, V, BO>;
  batch(array: Batch<K, V>[], options: BO, callback: (err: any) => any): AbstractChainedBatch<K, V, BO>;

  iterator(options?: IO & AbstractIteratorOptions<K>): AbstractIterator<K, V>;

  [index: string]: any;
}

interface AbstractLevelDOWNConstructor {
  new <K=any, V=any, O=any, PO=any, GO=any, DO=any, IO=any, BO=any>(location: string): AbstractLevelDOWN<
    K, V, O, PO, GO, DO, IO, BO>;
  <K=any, V=any, O=any, PO=any, GO=any, DO=any, IO=any, BO=any>(location: string): AbstractLevelDOWN<
    K, V, O, PO, GO, DO, IO, BO>;
}

export interface AbstractIteratorOptions<K=any> {
  gt?: K;
  gte?: K;
  lt?: K;
  lte?: K;
  reverse?: boolean;
  limit?: number;
  keys?: boolean;
  values?: boolean;
}

export type Batch<K=any, V?=any> = PutBatch<K, V> | DelBatch<K>

export interface PutBatch<K=any, V=any> {
  type: 'put',
  key: K,
  value: V
}

export interface DelBatch<K=any, V=any> {
  type: 'del',
  key: K
}

interface AbstractIterator<K=any, V=any> {
  db: any;
  next(callback: (err: any, key: K, value: V) => void): this;
  end(callback: (err: any) => void): void;
}

interface AbstractIteratorConstructor {
  new <K=any, V=any>(db: any): AbstractIterator<K, V>;
  <K=any, V=any>(db: any): AbstractIterator<K, V>;
}

interface AbstractChainedBatch<K=any, V=any, BO=any> extends AbstractChainedBatchConstructor {
  put(key: K, value: V): this;
  del(key: K): this;
  clear(): this;
  write(callback: any): any
  write(options: BO, callback: any): any
  [index: string]: any;
}

interface AbstractChainedBatchConstructor {
  new <K, V, BO>(db: any): AbstractChainedBatch<K, V, BO>;
  <K, V, BO>(db: any): AbstractChainedBatch<K, V, BO>;
}

export const AbstractLevelDOWN: AbstractLevelDOWNConstructor
export const AbstractIterator: AbstractIteratorConstructor
export const AbstractChainedBatch: AbstractChainedBatchConstructor
