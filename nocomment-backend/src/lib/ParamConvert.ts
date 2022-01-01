export class ParamConverter {
  public static ctxQueryConvert(
    ctxQuery: string | string[] | undefined,
  ): string {
    let value: string = '';
    if (ctxQuery instanceof Array) {
      value = ctxQuery[0];
    } else if (typeof ctxQuery === 'string') {
      value = ctxQuery;
    }
    return value;
  }
}
