const asyncWrapper = (fn: Function) => {
    return async (req: any, res: any, next: any) => {
        fn(req, res, next).catch(next);
    }
}
export default asyncWrapper;