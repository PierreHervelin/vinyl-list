import { Mutations } from './Mutations';
import { Queries } from './Queries';

const resolvers = {
    ...Queries,
    ...Mutations,
};

export default resolvers;
