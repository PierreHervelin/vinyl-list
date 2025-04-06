import { type CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
    schema: `${process.env.VITE_API_BASE_URL}/graphql`,
    documents: ['src/**/*.tsx', 'src/**/*.ts'],
    generates: {
        './src/gql/': {
            preset: 'client',
            plugins: ['typescript'],
            config: {
                useTypeImports: true,
            },
        },
    },
    hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
