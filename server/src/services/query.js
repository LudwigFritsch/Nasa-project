const PAGE_NUMBER_DEFAULT = 1;
const PAGE_LIMIT_DEFAULT = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || PAGE_NUMBER_DEFAULT;
  const limit = Math.abs(query.limit) || PAGE_LIMIT_DEFAULT;
  const skip = (page - 1) * limit;

  return { skip, limit };
}

module.exports = {
  getPagination,
};
