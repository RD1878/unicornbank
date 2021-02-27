import { IOperationItem } from "../interfaces/operationItem";

export const getFiltredOperations = (
  operations: IOperationItem[],
  card: string,
  currency: string,
  selectedDateFrom: Date | null,
  selectedDateTo: Date | null
): IOperationItem[] => {
  return operations
    .filter(({ id }) => (card === "all" ? true : id === card))
    .filter(({ operation }) =>
      currency === "all" ? true : operation.currency === currency
    )
    .filter(({ operation }) => {
      if (selectedDateFrom !== null) {
        return Date.parse(operation.date) >= selectedDateFrom.getTime();
      }
    })
    .filter(({ operation }) => {
      if (selectedDateTo !== null) {
        return Date.parse(operation.date) <= selectedDateTo.getTime();
      }
    });
};
