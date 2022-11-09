export enum ErrorMessage {
  SELECT_OPERATOR = 'Select an operator',
  SELECT_OPERATION = 'Select an operation',
  CONDITION_AND_MATCHFIELD =
      'Condition and match field cannot be used in the same row',
  CONDITION_AND_MINVALUE =
      'Condition and min. value cannot be used in the same row',
  CONDITION_AND_MAXVALUE =
      'Condition and max. value cannot be used in the same row',
  SELECT_CONDITION_OR_MATCHFIELD = 'Select either a condition or match field',
  SELECT_MINVALUE = 'Min. value must be filled',
  SELECT_MAXVALUE = 'Max. value must be filled',
  EMPTY_MAXVALUE = 'Max. value must be empty',
  LAST_OPERATION_EMPTY = 'Last operation should be empty',
  BRACES_DONT_MATCH = 'Opening and closing braces don\'t match',
  MIN_VALUE_NOT_A_NUMBER = 'Min. value must be a number',
  MAX_VALUE_NOT_A_NUMBER = 'Max. value must be a number',
  MAX_VALUE_LESS_THAN_MIN_VALUE =
      'Max. value can\'t be less than the min. value',
  MIN_VALUE_NOT_A_DATE =
      'Min. value must be a valid date in the format DD.MM.YYYY',
  MAX_VALUE_NOT_A_DATE =
      'Max. value must be a valid date in the format DD.MM.YYYY',
  MIN_DATE_AFTER_MAX_DATE =
      'Min. value date can\'t be after the max. value date'
}
