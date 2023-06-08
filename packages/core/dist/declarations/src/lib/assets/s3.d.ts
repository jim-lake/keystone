import type { StorageConfig } from '../../types';
import type { FileAdapter, ImageAdapter } from './types';
export declare function s3ImageAssetsAPI(storageConfig: StorageConfig & {
    kind: 's3';
}): ImageAdapter;
export declare function s3FileAssetsAPI(storageConfig: StorageConfig & {
    kind: 's3';
}): FileAdapter;
export declare function getS3AssetsEndpoint(storageConfig: StorageConfig & {
    kind: 's3';
}): string;
//# sourceMappingURL=s3.d.ts.map