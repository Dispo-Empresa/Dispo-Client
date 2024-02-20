const searchType =
{
    Equals: 0,
    Contains: 1,
    StartsWith: 2,
    EndsWith: 3,
    GreaterThan: 4,
    GreaterThanOrEqual: 5,
    LessThan: 6,
    LessThanOrEqual: 7
}

export default function convert(filterMatchMode){
  switch(filterMatchMode){
    case "contains":
        return searchType.Contains;
    case "startsWith":
        return searchType.StartsWith;
    default: 
        return searchType.Contains;
  }
}