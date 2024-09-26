export type Data = Record<string, string>[];

export enum CONDITIONS {
  equals = 'equals',
  grather_than = 'grather_than',
  less_than = 'less_than',
  not_equal = 'not_equal',
  includes = 'includes',
}

export enum OPERATORS {
  AND = 'AND',
  OR = 'OR',
}

export type FilterValue = {
  base: string;
  condition: CONDITIONS;
  value: string;
};

export type Filter =
  | FilterValue
  | {
      operator: OPERATORS;
      conditions: Filter[];
    };
