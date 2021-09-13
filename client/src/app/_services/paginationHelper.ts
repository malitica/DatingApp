import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

export function getPaginatedResults<T>(url:any, params:any, http: HttpClient) {
    const paginatedResult:  PaginatedResult<T | null>  = new PaginatedResult<T | null>();
    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        return paginatedResult;
      })
    );
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number)
  {
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber!.toString())
      params = params.append('pageSize', pageSize!.toString())

      return params;
    
  }