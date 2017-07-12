import {RavenCommand} from "../RavenCommand";
import {RequestMethods} from "../../Http/Request/RequestMethod";
import {StatusCodes} from "../../Http/Response/StatusCode";
import {ServerNode} from "../../Http/ServerNode";
import {StringUtil} from "../../Utility/StringUtil";
import {IResponse} from "../../Http/Response/IResponse";
import {IRavenResponse} from "../RavenCommandResponse";
import {ErrorResponseException} from "../DatabaseExceptions";

export class GetStatisticsCommand extends RavenCommand {
  protected debugTag?: string;

  constructor(debugTag?: string) {
    super('', RequestMethods.Get);
    this.debugTag = debugTag;
  }

  public createRequest(serverNode: ServerNode): void {
    this.endPoint = StringUtil.format('{url}/databases/{database}/stats', serverNode);
    this.debugTag && this.addParams(this.debugTag, null);
  }

  public setResponse(response: IResponse): IRavenResponse | IRavenResponse[] | void {
    const result: IRavenResponse = <IRavenResponse>super.setResponse(response);

    if (StatusCodes.isOk(response.statusCode) && response.body) {
      return result;
    }    
  }
}
