import { relative, resolve as resolveDir } from 'node:path';
import { defineConfig, type Options } from 'tsup';

export const createTsupConfig = ({
    globalName = undefined,
    format = ['esm', 'cjs'],
    target = 'es2020',
    sourcemap = true,
    esbuildOptions = undefined,
    ...other
}: Options = {}) => defineConfig({
    clean: true,
    dts: false,
    entry: ['src/index.ts'],
    format,
    minify: false,
    skipNodeModulesBundle: true,
    sourcemap,
    target,
    tsconfig: relative(__dirname, resolveDir(process.cwd(), 'tsconfig.build.json')),
    keepNames: true,
    globalName,
    esbuildOptions(options, context) {
        if (esbuildOptions) {
            esbuildOptions(options, context);
        }

        options.target = target;
    },
    ...other,
});
