type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

declare module "fs-monkey";
declare module "aglio";
declare module "aglio-theme-olio";
