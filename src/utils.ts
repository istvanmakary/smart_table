import { CONDITIONS, Data, Filter, FilterValue } from './types';

const evaluateCondition = (
  item: Data[number],
  condition: FilterValue
): boolean => {
  const { base, condition: cond, value } = condition;
  const itemValue = item[base];

  // not using strict equal to ignore type diffs
  switch (cond) {
    case CONDITIONS.equals:
      return itemValue == value;
    case CONDITIONS.not_equal:
      return itemValue != value;
    case CONDITIONS.grather_than:
      return Number(itemValue) > Number(value);
    case CONDITIONS.less_than:
      return Number(itemValue) < Number(value);
    case CONDITIONS.includes:
      return itemValue?.includes(value);
    default:
      return false;
  }
};

const evaluateConditions = (
  item: Data[number],
  recursiveCondition: Filter
): boolean => {
  if ('operator' in recursiveCondition) {
    const { operator, conditions } = recursiveCondition;

    if (operator === 'AND') {
      return conditions.every((cond) => evaluateCondition(item, cond));
    } else if (operator === 'OR') {
      return conditions.some((cond) => evaluateCondition(item, cond));
    }
  } else {
    return evaluateCondition(item, recursiveCondition);
  }
  return false;
};

export const filterByCondition = (
  data: Data,
  recursiveCondition: Filter
): Data => {
  return data.filter((item) => evaluateConditions(item, recursiveCondition));
};
