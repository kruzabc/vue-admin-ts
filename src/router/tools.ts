export function redirectMake(path: string, redirectPath: string) {
    return {
        path,
        redirect: redirectPath,
        meta: {
        }
    };
}
