import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApolloQueryResult, QueryOptions, WatchQueryOptions} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';

@Injectable({providedIn: 'root'})
export class GraphqlService {
    constructor(private apollo: Apollo) {}

    /**
     * Query through graphQL
     * @param {DocumentNode} query
     * @param {Record<string, any> | null | undefined} variables
     * @returns {Observable<ApolloQueryResult<T>>}
     */
    query<T>(query: DocumentNode, variables?: Record<string, any>): Observable<ApolloQueryResult<T>> {
        const options: QueryOptions = variables ? {query, variables} : {query};
        return this.apollo.query<T>(options);
    }

    /**
     * Watch query through graphQL
     * @param {DocumentNode} query
     * @param {Record<string, any> | null | undefined} variables
     * @returns {Observable<ApolloQueryResult<T>>}
     */
    watchQuery<T>(query: DocumentNode, variables?: Record<string, any>): Observable<ApolloQueryResult<T>> {
        const options: WatchQueryOptions = variables ? {query, variables} : {query};
        return this.apollo.watchQuery<T>(options).valueChanges;
    }
}
