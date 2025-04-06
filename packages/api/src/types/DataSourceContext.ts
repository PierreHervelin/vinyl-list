import { DiscogsApi } from '../datasources/DiscogsApi';
import { ListDataSource } from '../datasources/ListDataSource';

export interface DataSourceContext {
    dataSources: {
        discogsApi: DiscogsApi;
        listDataSource: ListDataSource;
    };
}
