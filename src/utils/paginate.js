import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;

  return _(items).slice(startIndex).take(pageSize).value();
  // take() function pick up the items equal the size of 'pageSize' from startIndex.
  // *** If items are lesser than the pageSize, It is not going to give error,
  //         it will return the items availabel
}
