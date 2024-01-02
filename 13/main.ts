
type DayCounter<Start extends number, Stop extends number> = 
    Start extends Stop 
    ? Stop  // Terminate loop 
    : Start | DayCounter<AddOne<Start>, Stop>; // Emit N | ...Rest


type Length<T extends unknown[]> =
  T extends { 
    length: infer L extends number; // Use 'extends number' to help type inference
  } ? L : never;

type CreateTupleOfLength<N extends number, _Arr extends unknown[] = []> =
  _Arr extends { length: N }
  ? _Arr  // Array argument is desired length already, return it.
  : CreateTupleOfLength<N, [..._Arr, 0]>; // Call recursively, adding 1 item to array.
type AddOne<N extends number> = 
  Length<[0, ...CreateTupleOfLength<N>]>;
  