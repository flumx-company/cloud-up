export enum ErrorMessage {
  SELECT_OPERATOR = 'Select an operator',
  SELECT_OPERATION = 'Select an operation',
  RESTRICTION_AND_MATCHFIELDS =
      'Restriction and match fields cannot be used in the same row',
  RESTRICTION_AND_MINVALUES =
      'Restriction and min. values cannot be used in the same row',
  RESTRICTION_AND_MAXVALUES =
      'Restriction and max. values cannot be used in the same row',
  SELECT_RESTRICTION_OR_MATCHFIELD =
      'Select either a restriction or match field OI',
  SELECT_MINVALUE = 'Min. value must be filled',
  SELECT_MAXVALUE = 'Max. value must be filled',
  SELECT_FILTER_MINVALUE = 'Filter for min. value must be filled',
  EMPTY_MAXVALUE = 'Max. value must be empty',
  LAST_OPERATION_EMPTY = 'Last operation should be empty',
  // tslint:disable-next-line:quotemark
  BRACES_DONT_MATCH = 'Opening and closing braces don\'t match',
  THREE_WAY_XOR =
      'Match field Payment Information, min./max. values and filters cannot be used in the same row',
  SELECT_FIELD_OR_VALUES_OR_FILTERS =
      'Select either match field Payment Information, min./max. values or filters',
  CANNOT_USE_BETWEEN_AND_MATCHFIELD =
      'Cannot use match field Payment Information with between-including or -excluding operator'
}
