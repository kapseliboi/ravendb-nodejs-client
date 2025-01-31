import { IDocumentQueryBaseSingle } from "./IDocumentQueryBaseSingle";
import { IAggregationDocumentQuery } from "./../Queries/Facets/IAggregationDocumentQuery";
import { IEnumerableQuery } from "./IEnumerableQuery";
import { QueryResult } from "../Queries/QueryResult";
import { DocumentType } from "../DocumentAbstractions";
import { QueryData } from "../Queries/QueryData";
import { GroupBy } from "../Queries/GroupBy";
import { IDocumentQueryBase } from "./IDocumentQueryBase";
import { IGroupByDocumentQuery } from "./IGroupByDocumentQuery";
import { IFacetBuilder } from "../Queries/Facets/IFacetBuilder";
import { FacetBase } from "./../Queries/Facets/FacetBase";
import { IMoreLikeThisBuilderForDocumentQuery } from "../Queries/MoreLikeThis/IMoreLikeThisBuilderForDocumentQuery";
import { MoreLikeThisBase } from "../Queries/MoreLikeThis/MoreLikeThisBase";
import { ISuggestionBuilder } from "../Queries/Suggestions/ISuggestionBuilder";
import { ISuggestionDocumentQuery } from "../Queries/Suggestions/ISuggestionDocumentQuery";
import { SuggestionBase } from "../Queries/Suggestions/SuggestionBase";
import { ITimeSeriesQueryBuilder } from "../Queries/TimeSeries/ITimeSeriesQueryBuilder";
import { TimeSeriesAggregationResult } from "../Queries/TimeSeries/TimeSeriesAggregationResult";
import { TimeSeriesRawResult } from "../Queries/TimeSeries/TimeSeriesRawResult";
import { Field } from "../../Types";
import { ProjectionBehavior } from "../Queries/ProjectionBehavior";

/**
 * A query against a Raven index
 */
export interface IDocumentQuery<T extends object>
    extends IDocumentQueryBase<T, IDocumentQuery<T>>,
        IDocumentQueryBaseSingle<T>,
        IEnumerableQuery<T> {

    indexName;

    /**
     * Whether we should apply distinct operation to the query on the server side
     */
    isDistinct;

    /**
     * Returns the query result. Accessing this property for the first time will execute the query.
     */
    getQueryResult(): Promise<QueryResult>;

    //TODO: support for js projections?

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value
     * will come from document directly.
     */
    selectFields<TProjection extends object>(
        property: string, projectionClass: DocumentType<TProjection>): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value
     * will come from document directly.
     */
    selectFields<TProjection extends object>(
        properties: string[], projectionClass: DocumentType<TProjection>): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value
     * will come from document directly.
     */
    selectFields<TProjection extends object>(
        properties: string[], projectionClass: DocumentType<TProjection>, projectionBehavior: ProjectionBehavior): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value will come from document directly.
     */
    selectFields<TProjection extends object>(properties: string[]): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value will come from document directly.
     */
    selectFields<TProjection extends Object>(property: string): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value will come from document directly.
     */
    selectFields<TProjection extends object>(
        queryData: QueryData, projectionClass: DocumentType<TProjection>): IDocumentQuery<TProjection>;

    /**
     * Selects the specified fields directly from the index if the are stored.
     * If the field is not stored in index, value will come from document directly.
     */
    selectFields<TProjection extends object>(
        queryData: QueryData, projectionClass: DocumentType<TProjection>, projectionBehavior: ProjectionBehavior): IDocumentQuery<TProjection>;

    /**
     * Selects a Time Series Aggregation based on
     * a time series query generated by an ITimeSeriesQueryBuilder.
     * @param timeSeriesQuery query provider
     * @param projectionClass result class
     */
    selectTimeSeries(
        timeSeriesQuery: (builder: ITimeSeriesQueryBuilder) => void,
        projectionClass: DocumentType<TimeSeriesAggregationResult>): IDocumentQuery<TimeSeriesAggregationResult>;

    /**
     * Selects a Time Series Aggregation based on
     * a time series query generated by an ITimeSeriesQueryBuilder.
     * @param timeSeriesQuery query provider
     * @param projectionClass result class
     */
    selectTimeSeries(
        timeSeriesQuery: (builder: ITimeSeriesQueryBuilder) => void,
        projectionClass: DocumentType<TimeSeriesRawResult>): IDocumentQuery<TimeSeriesRawResult>;

    /**
     * Changes the return type of the query
     */
    ofType<TResult extends object>(resultClass: DocumentType<TResult>): IDocumentQuery<TResult>;

    groupBy(fieldName: Field<T>, ...fieldNames: string[]): IGroupByDocumentQuery<T>;

    groupBy(field: GroupBy, ...fields: GroupBy[]): IGroupByDocumentQuery<T>;

    moreLikeThis(
        builder: (moreLikeThisBuilder: IMoreLikeThisBuilderForDocumentQuery<T>) => void): IDocumentQuery<T>;

    moreLikeThis(moreLikeThis: MoreLikeThisBase): IDocumentQuery<T>;

    //TBD MoreLikeThis

    suggestUsing(suggestion: SuggestionBase): ISuggestionDocumentQuery<T>;

    suggestUsing(action: (builder: ISuggestionBuilder<T>) => void): ISuggestionDocumentQuery<T>;

    aggregateBy(action: (builder: IFacetBuilder<T>) => void): IAggregationDocumentQuery<T>;

    aggregateBy(facet: FacetBase): IAggregationDocumentQuery<T>;

    aggregateBy(...facet: FacetBase[]): IAggregationDocumentQuery<T>;

    aggregateUsing(facetSetupDocumentId: string): IAggregationDocumentQuery<T>;
}
