export const useInspector = (): boolean => {
  return process.env.NODE_ENV === 'development'
}
