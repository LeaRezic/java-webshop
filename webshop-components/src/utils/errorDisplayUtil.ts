export const getErrorDisplay = (error: string = 'some error'): string => {
  return `Exuse us, something went wrong. Please try again later or contact support. Error details: ${error}.`;
}